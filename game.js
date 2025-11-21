// ==========================================
//  Yama RPG - 3 Party Members Edition
// ==========================================

const mapSize = 10;
// 1:壁, 0:通路, 2:階段, 3:ボス, 9:入口
const mapLevel1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 2, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 9, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const mapLevel2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 1, 3, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let currentMapData = [];
let visitedMaps = {
    1: Array(mapSize).fill().map(() => Array(mapSize).fill(false)),
    2: Array(mapSize).fill().map(() => Array(mapSize).fill(false))
};

// 職業データ
const jobData = {
    hero: { name: "勇者", str: 4, hpVal: 30, spells: { flame: 2, heal: 2, double: 0 }, desc: "バランス型。" },
    mage: { name: "魔法使い", str: 1, hpVal: 20, spells: { flame: 9, heal: 0, double: 0 }, desc: "攻撃魔法が得意。" },
    priest: { name: "僧侶", str: 2, hpVal: 25, spells: { flame: 0, heal: 9, double: 0 }, desc: "回復が得意。" },
    warrior: { name: "戦士", str: 5, hpVal: 35, spells: { flame: 0, heal: 0, double: 5 }, desc: "力が強い。二段切りが可能。" }
};

// ★パーティーデータ (3人体制)
let party = [
    {
        id: "char0", name: "アベル", jobId: "hero",
        hp: 30, maxHp: 30, alive: true, isDefending: false,
        spells: { flame: { name: "フレイム", max: 2, current: 2 }, heal: { name: "ヒール", max: 2, current: 2 }, double:{ name: "二段切り", max: 0, current: 0 } }
    },
    {
        id: "char1", name: "メイ", jobId: "mage",
        hp: 20, maxHp: 20, alive: true, isDefending: false,
        spells: { flame: { name: "フレイム", max: 9, current: 9 }, heal: { name: "ヒール", max: 0, current: 0 }, double:{ name: "二段切り", max: 0, current: 0 } }
    },
    {
        // ★3人目追加
        id: "char2", name: "シーラ", jobId: "priest",
        hp: 25, maxHp: 25, alive: true, isDefending: false,
        spells: { flame: { name: "フレイム", max: 0, current: 0 }, heal: { name: "ヒール", max: 9, current: 9 }, double:{ name: "二段切り", max: 0, current: 0 } }
    }
];

let playerPos = { x: 1, y: 8, dir: 0, floor: 1 };
let enemy = { name: "", hp: 0, maxHp: 0, isBoss: false, isCharging: false };
let isBattle = false;
let activeMemberIndex = 0;
let ctx;

let templeTargetIndex = -1;
let templeSelectedJob = "";

// --- 初期化 ---
window.onload = function() {
    loadMap(1);
    initMapUI();
    updateTownStatus();
    
    const canvas = document.getElementById('dungeon-canvas');
    ctx = canvas.getContext('2d');

    // ★追加: キーボード操作の対応
    document.addEventListener('keydown', (event) => {
        // ダンジョン画面が表示されていない時は無効
        if (document.getElementById('dungeon-scene').style.display === 'none') return;
        
        // 戦闘中などの判定は movePlayer 関数内で行われているので、ここでは呼び出すだけでOK

        switch(event.key) {
            // 前進 (上矢印 or W)
            case 'ArrowUp':
            case 'w':
            case 'W':
                movePlayer('forward');
                break;

            // 後退 (下矢印 or S)
            case 'ArrowDown':
            case 's':
            case 'S':
                movePlayer('backward');
                break;

            // 左旋回 (左矢印 or A)
            case 'ArrowLeft':
            case 'a':
            case 'A':
                turnPlayer('left');
                break;

            // 右旋回 (右矢印 or D)
            case 'ArrowRight':
            case 'd':
            case 'D':
                turnPlayer('right');
                break;

            // 探索 (エンター or スペース)
            case 'Enter':
            case ' ':
                checkArea();
                break;
        }
    });
};

function startGame() {
    document.getElementById('prologue-scene').style.display = 'none';
    document.getElementById('town-scene').style.display = 'block';
}
function loadMap(floorNum) {
    playerPos.floor = floorNum;
    currentMapData = (floorNum === 1) ? mapLevel1 : mapLevel2;
    document.getElementById('floor-display').innerText = `迷宮 地下${floorNum}階`;
}

// --- 町 ---
function updateTownStatus() {
    // ★3人分ループ
    for(let i=0; i<3; i++) {
        let p = party[i];
        let jName = jobData[p.jobId].name;
        document.getElementById(`town-job-${i}`).innerText = jName;
        document.getElementById(`town-hp-${i}`).innerText = `${p.hp} / ${p.maxHp}`;
        document.getElementById(`st-job-${i}`).innerText = jName.charAt(0);
        document.getElementById(`st-name-${i}`).innerText = p.name;
    }
}
function townLog(msg) { const l=document.getElementById('town-log'); l.innerHTML+=`<p>> ${msg}</p>`; l.scrollTop=l.scrollHeight; }
function townAction(action) {
    if (action === 'inn') {
        party.forEach(p => { 
            p.hp = p.maxHp; p.alive = true; p.isDefending = false; 
            for(let k in p.spells) p.spells[k].current = p.spells[k].max; 
        });
        updateTownStatus(); townLog("宿に泊まった。全員全回復！");
    } else if (action === 'temple') openTemple();
    else if (action === 'dungeon') enterDungeon();
    else townLog("それは未実装だ。");
}

// --- 神殿 ---
function openTemple() { document.getElementById('town-scene').style.display='none'; document.getElementById('temple-scene').style.display='block'; document.getElementById('job-list').style.display='none'; templeTargetIndex=-1; updateTempleUI(); }
function exitTemple() { document.getElementById('temple-scene').style.display='none'; document.getElementById('town-scene').style.display='block'; updateTownStatus(); townLog("神殿を出た。"); }
function selectTempleMember(idx) { templeTargetIndex=idx; templeSelectedJob=""; document.getElementById('job-list').style.display='block'; document.getElementById('job-desc').innerText="職業を選んでください。"; 
    document.getElementById('tm-char-0').classList.remove('btn-selected'); document.getElementById('tm-char-1').classList.remove('btn-selected'); document.getElementById('tm-char-2').classList.remove('btn-selected');
    document.getElementById(`tm-char-${idx}`).classList.add('btn-selected'); 
    document.querySelectorAll('.job-btn').forEach(b=>b.classList.remove('btn-selected')); }
function selectTempleJob(jobId) { templeSelectedJob=jobId; const info=jobData[jobId]; document.getElementById('job-desc').innerText=`【${info.name}】\n力:${info.str} HP:${Math.floor(info.hpVal/6)}/5\n${info.desc}`; document.querySelectorAll('.job-btn').forEach(b=>b.classList.remove('btn-selected')); } 
function executeClassChange() { 
    if(templeTargetIndex===-1||templeSelectedJob==="")return; 
    const t=party[templeTargetIndex]; const nj=jobData[templeSelectedJob]; 
    t.jobId=templeSelectedJob; t.maxHp=nj.hpVal; t.hp=nj.hpVal; 
    t.spells.flame.max=nj.spells.flame; t.spells.flame.current=nj.spells.flame; 
    t.spells.heal.max=nj.spells.heal; t.spells.heal.current=nj.spells.heal;
    if(!t.spells.double) t.spells.double = { name:"二段切り", max:0, current:0 };
    let dMax = nj.spells.double || 0; 
    t.spells.double.max = dMax; t.spells.double.current = dMax;
    alert("転職しました！"); exitTemple(); 
}
function updateTempleUI() { document.getElementById('tm-char-0').classList.remove('btn-selected'); document.getElementById('tm-char-1').classList.remove('btn-selected'); document.getElementById('tm-char-2').classList.remove('btn-selected'); }

// --- ダンジョン・移動 ---
function enterDungeon() {
    // ★全滅判定(3人)
    if (!party[0].alive && !party[1].alive && !party[2].alive) { townLog("動ける者がいない！"); return; }
    document.getElementById('town-scene').style.display = 'none';
    document.getElementById('dungeon-scene').style.display = 'flex';
    log("地下迷宮へ...");
    loadMap(1); playerPos.x=1; playerPos.y=8; playerPos.dir=0;
    checkObject(); updatePlayerVision(); renderMap(); updateScreen();
}
function returnToTown(force = false) {
    if (isBattle && !force) return;
    if (!force && currentMapData[playerPos.y][playerPos.x] !== 9) { log("出口ではない！"); return; }
    document.getElementById('dungeon-scene').style.display = 'none';
    document.getElementById('town-scene').style.display = 'block';
    if (!force) townLog("町へ戻った。");
    updateTownStatus();
}
function turnPlayer(d) { if(isBattle)return; if(d==='left')playerPos.dir=(playerPos.dir+3)%4; if(d==='right')playerPos.dir=(playerPos.dir+1)%4; renderMap(); updateScreen(); }
function movePlayer(t) { 
    if(isBattle)return; 
    let dx=0, dy=0, d=playerPos.dir; 
    if(t === 'forward'){ if(d===0)dy=-1; if(d===1)dx=1; if(d===2)dy=1; if(d===3)dx=-1; } 
    else { if(d===0)dy=1; if(d===1)dx=-1; if(d===2)dy=-1; if(d===3)dx=1; } 
    executeMove(dx,dy); 
}
function executeMove(dx, dy) {
    const nx=playerPos.x+dx, ny=playerPos.y+dy;
    if(nx<0||nx>=mapSize||ny<0||ny>=mapSize){ log("行き止まりだ。"); return; }
    if(currentMapData[ny][nx]===1){ visitedMaps[playerPos.floor][ny][nx]=true; renderMap(); log("壁だ。"); updateScreen(); return; }
    playerPos.x=nx; playerPos.y=ny; checkObject(); updatePlayerVision(); renderMap(); updateScreen();
    if(currentMapData[ny][nx]===3){ log("⚠️ 殺気を感じる..."); setTimeout(startBossBattle,1500); return; }
    if(currentMapData[ny][nx]!==9 && currentMapData[ny][nx]!==2 && Math.random()<0.2) startBattle();
}
function checkObject() { document.getElementById('btn-return').style.display=(currentMapData[playerPos.y][playerPos.x]===9)?'block':'none'; }
function checkArea() {
    if(isBattle)return;
    const v=currentMapData[playerPos.y][playerPos.x];
    if(v===9)log("出口だ。");
    else if(v===2){ 
        if(playerPos.floor===1){log("地下2階へ。");loadMap(2);playerPos.x=1;playerPos.y=1;}
        else{log("地下1階へ。");loadMap(1);playerPos.x=3;playerPos.y=3;} 
        updatePlayerVision(); renderMap(); updateScreen();
    }
    else if(v===3)log("恐ろしい気配...");
    else log("特に何もない。");
}

// --- 戦闘システム ---

function startBattle() {
    const md=[{name:"ゴブリン",hp:15,img:"goblin.png"},{name:"オーク",hp:25,img:"orc.png"},{name:"スライム",hp:10,img:"slime.png"}];
    setupEnemy(md[Math.floor(Math.random()*md.length)], false);
    log(`${enemy.name} が出現した！`);
}
function startBossBattle() {
    setupEnemy({ name: "ドラゴン", hp: 80, img: "dragon.png" }, true);
    log("🔥 ドラゴンが出現した！！！");
}
function setupEnemy(data, isBoss) {
    isBattle=true;
    enemy.name=data.name; enemy.hp=data.hp; enemy.maxHp=data.hp; enemy.isBoss=isBoss; 
    enemy.isCharging = false;
    document.getElementById('enemy-img').src=data.img; 
    document.getElementById('enemy-img').style.display='block';
    if(ctx){ctx.fillStyle="rgba(0,0,0,0.7)";ctx.fillRect(0,0,300,200);}
    document.getElementById('enemy-stat').style.visibility='visible';
    document.getElementById('enemy-name').innerText=enemy.name;
    document.getElementById('battle-msg').style.display='block';
    activeMemberIndex = 0;
    nextTurn(true);
}

function nextTurn(isFirst = false) {
    if (!isFirst) activeMemberIndex++;
    if (activeMemberIndex >= party.length) { enemyTurn(); return; }
    if (!party[activeMemberIndex].alive) { nextTurn(); return; }
    party[activeMemberIndex].isDefending = false;
    updateBattleUI();
}

function updateBattleUI() {
    const m = party[activeMemberIndex];
    document.getElementById('battle-msg').innerText = `▶ ${m.name} の行動`;
    toggleControls('battle');
    updateScreen();
}

function fight(action) {
    if (!isBattle) return;
    const actor = party[activeMemberIndex];
    const str = jobData[actor.jobId].str;

    if (action === 'run') {
        if (enemy.isBoss) { log("ボスからは逃げられない！"); nextTurn(); return; }
        if (Math.random() > 0.5) { log("逃げ切れた！"); endBattle(); } else { log("回り込まれた！"); nextTurn(); }
        return;
    }
    if (action === 'attack') {
        playVfx('slash');
        let dmg = Math.floor(Math.random() * 3) + str; 
        enemy.hp -= dmg;
        log(`${actor.name}の攻撃！ ${dmg}ダメージ！`);
        checkWin();
    } 
    else if (action === 'defend') {
        actor.isDefending = true;
        log(`${actor.name}は身を固めて防御した！`);
        nextTurn();
    }
}

function castSpell(type) {
    if (!isBattle) return;
    const actor = party[activeMemberIndex];
    const spell = actor.spells[type];
    if (!spell || spell.current <= 0) return;

    if (type === 'flame') {
        spell.current--; toggleControls('battle'); playVfx('fire');
        let dmg = Math.floor(Math.random() * 6) + 6;
        enemy.hp -= dmg;
        log(`${actor.name}のフレイム！ ${dmg}ダメージ！`);
        checkWin();
    } else if (type === 'heal') {
        toggleControls('target');
        // ★3人分のボタン更新
        document.getElementById('btn-target-0').innerText = `${party[0].name} (HP:${party[0].hp})`;
        document.getElementById('btn-target-1').innerText = `${party[1].name} (HP:${party[1].hp})`;
        document.getElementById('btn-target-2').innerText = `${party[2].name} (HP:${party[2].hp})`;
    }
    else if (type === 'double') {
        spell.current--; toggleControls('battle'); playVfx('slash');
        const str = jobData[actor.jobId].str;
        let totalDmg = (Math.floor(Math.random() * 3) + str) * 2;
        enemy.hp -= totalDmg;
        log(`${actor.name}の二段切り！ ${totalDmg}の大ダメージ！`);
        checkWin();
    }
}

function executeHeal(idx) {
    const actor = party[activeMemberIndex];
    const target = party[idx];
    if(actor.spells.heal.current > 0) actor.spells.heal.current--; else return;
    toggleControls('battle'); playVfx('heal');
    let rec = Math.floor(Math.random() * 10) + 10;
    target.hp += rec; if (target.hp > target.maxHp) target.hp = target.maxHp;
    if (!target.alive) { target.alive=true; log(`${target.name}が蘇生した！`); }
    else log(`${target.name}のHP${rec}回復。`);
    updateScreen(); nextTurn();
}

function openSpellMenu() {
    toggleControls('spell');
    const actor = party[activeMemberIndex];
    
    const bf = document.getElementById('btn-spell-flame');
    const bh = document.getElementById('btn-spell-heal');
    const bd = document.getElementById('btn-skill-double'); // 二段切りボタン
    
    // フレイム
    if (actor.spells.flame && actor.spells.flame.max > 0) {
        bf.style.display = 'inline-block';
        // ★修正: 名前「フレイム」を復活
        bf.innerText = `🔥 フレイム (${actor.spells.flame.current})`;
        bf.disabled = (actor.spells.flame.current <= 0);
    } else {
        bf.style.display = 'none';
    }

    // ヒール
    if (actor.spells.heal && actor.spells.heal.max > 0) {
        bh.style.display = 'inline-block';
        // ★修正: 名前「ヒール」を復活
        bh.innerText = `✨ ヒール (${actor.spells.heal.current})`;
        bh.disabled = (actor.spells.heal.current <= 0);
    } else {
        bh.style.display = 'none';
    }

    // 二段切り
    if (actor.spells.double && actor.spells.double.max > 0) {
        bd.style.display = 'inline-block';
        // ★修正: 名前「二段切り」を復活
        bd.innerText = `⚔️ 二段切り (${actor.spells.double.current})`;
        bd.disabled = (actor.spells.double.current <= 0);
    } else {
        bd.style.display = 'none';
    }
}

function closeSpellMenu() { toggleControls('battle'); }

function checkWin() {
    if (enemy.hp <= 0) {
        const img = document.getElementById('enemy-img'); img.style.opacity = 0;
        log(`${enemy.name} を倒した！`);
        if (enemy.isBoss) setTimeout(gameClear, 1000);
        else setTimeout(() => { img.style.opacity = 1; endBattle(); }, 800);
    } else { setTimeout(nextTurn, 800); }
}

function enemyTurn() {
    if (!isBattle) return;
    document.getElementById('battle-msg').innerText = "⚠️ 敵の攻撃！";
    let livingMembers = party.filter(p => p.alive);
    if (livingMembers.length === 0) { gameOver(); return; }

    if (enemy.isBoss) {
        if (enemy.isCharging) {
            enemy.isCharging = false; log(`🐲 ドラゴンは溜めた力を解き放った！！！`); playVfx('fire'); 
            let target = livingMembers[Math.floor(Math.random() * livingMembers.length)];
            applyDamage(target, Math.floor(Math.random() * 11) + 25); endEnemyTurn(); return;
        }
        const roll = Math.random();
        if (roll < 0.3) {
            log(`🐲 ドラゴンは激しい炎を吐き出した！(全体)`); playVfx('fire');
            livingMembers.forEach(member => { applyDamage(member, Math.floor(Math.random() * 5) + 8); });
            endEnemyTurn(); return;
        }
        if (roll < 0.6) { enemy.isCharging = true; log(`🐲 ドラゴンは力を溜めている...！`); endEnemyTurn(); return; }
    }

    playVfx('damage');
    let target = livingMembers[Math.floor(Math.random() * livingMembers.length)];
    let baseDmg = enemy.isBoss ? 6 : 3;
    let dmg = Math.floor(Math.random() * baseDmg) + 1;
    applyDamage(target, dmg);
    endEnemyTurn();
}

function applyDamage(target, dmg) {
    if (target.isDefending) { dmg = Math.floor(dmg / 2); if (dmg < 1) dmg = 1; log(`${target.name}は防御した！ (${dmg}ダメ)`); } 
    else { log(`${target.name}に ${dmg} のダメージ！`); }
    target.hp -= dmg;
    if (target.hp <= 0) { target.hp = 0; target.alive = false; log(`${target.name}は倒れた...`); }
    updateScreen();
}

function endEnemyTurn() {
    // ★全滅判定(3人)
    if (!party[0].alive && !party[1].alive && !party[2].alive) { setTimeout(gameOver, 1000); } 
    else { activeMemberIndex = -1; setTimeout(() => nextTurn(), 1500); }
}

function endBattle() {
    isBattle = false;
    document.getElementById('enemy-img').style.display = 'none';
    document.getElementById('enemy-stat').style.visibility = 'hidden';
    document.getElementById('battle-msg').style.display = 'none';
    toggleControls('move'); updateScreen();
}

function gameOver() {
    log("全滅した...");
    setTimeout(() => {
        isBattle = false; endBattle(); returnToTown(true);
        party.forEach(p => { p.hp = 1; p.alive = true; p.isDefending = false; });
        townLog("全滅した... 教会送りだ。"); updateTownStatus();
    }, 2000);
}

function gameClear() {
    document.getElementById('main-area').innerHTML = `<div style="color:#ff3;font-size:2em;text-align:center;margin-top:50px;">🎉 GAME CLEARED! 🎉</div><button class="btn" onclick="location.reload()" style="margin:20px auto;display:block;">タイトルへ</button>`;
    document.getElementById('battle-controls').style.display = 'none';
}

function toggleControls(mode) {
    document.getElementById('move-controls').style.display='none'; document.getElementById('battle-controls').style.display='none'; document.getElementById('spell-controls').style.display='none'; document.getElementById('target-controls').style.display='none';
    if (mode === 'move') { document.getElementById('move-controls').style.display='grid'; checkObject(); }
    if (mode === 'battle') document.getElementById('battle-controls').style.display='grid';
    if (mode === 'spell') document.getElementById('spell-controls').style.display='grid';
    if (mode === 'target') document.getElementById('target-controls').style.display='grid';
}

// --- 描画・VFX (洞窟風カラーに修正) ---
function getRelPos(f,s){let x=playerPos.x,y=playerPos.y,d=playerPos.dir;if(d===0)y-=f;if(d===1)x+=f;if(d===2)y+=f;if(d===3)x-=f;if(d===0)x+=s;if(d===1)y+=s;if(d===2)x-=s;if(d===3)y-=s;if(x<0||x>=mapSize||y<0||y>=mapSize)return 1;return(currentMapData[y][x]===1)?1:0;}

function draw3D() {
    if (!ctx) return;
    // 天井 (暗いグレー)
    ctx.fillStyle = "#1a1a1a"; 
    ctx.fillRect(0, 0, 300, 100);
    // 床 (暗い茶色)
    ctx.fillStyle = "#2d241b"; 
    ctx.fillRect(0, 100, 300, 100);

    for (let d = 3; d >= 0; d--) drawLayer(d);
}

function drawLayer(d) {
    const l = getRelPos(d,-1)===1, r = getRelPos(d,1)===1, f = getRelPos(d,0)===1;
    const m = [{x:0,y:0,w:300,h:200},{x:60,y:40,w:180,h:120},{x:100,y:70,w:100,h:60},{x:120,y:85,w:60,h:30}][d];
    const nm = [{x:0,y:0,w:300,h:200},{x:60,y:40,w:180,h:120},{x:100,y:70,w:100,h:60},{x:120,y:85,w:60,h:30}][d+1];
    
    // ★壁の色 (距離によって暗くする: 岩肌色)
    // 近い: #6b5b45 -> 遠い: #221e18
    const intensity = 1.0 - (d * 0.25); 
    const rVal = Math.floor(107 * intensity);
    const gVal = Math.floor(91 * intensity);
    const bVal = Math.floor(69 * intensity);
    
    const wallColor = `rgb(${rVal}, ${gVal}, ${bVal})`;
    const sideColor = `rgb(${Math.floor(rVal*0.7)}, ${Math.floor(gVal*0.7)}, ${Math.floor(bVal*0.7)})`; // 側面は影
    const edgeColor = "#111"; // 輪郭線

    ctx.lineWidth = 2; 
    ctx.strokeStyle = edgeColor;

    if (f) { 
        ctx.fillStyle = wallColor; 
        ctx.fillRect(m.x, m.y, m.w, m.h); 
        ctx.strokeRect(m.x, m.y, m.w, m.h); 
    } else if (d < 3) {
        if (l) { 
            ctx.fillStyle = sideColor; 
            ctx.beginPath(); ctx.moveTo(m.x,m.y); ctx.lineTo(nm.x,nm.y); ctx.lineTo(nm.x,nm.y+nm.h); ctx.lineTo(m.x,m.y+m.h); ctx.fill(); ctx.stroke(); 
        }
        if (r) { 
            ctx.fillStyle = sideColor; 
            ctx.beginPath(); ctx.moveTo(m.x+m.w,m.y); ctx.lineTo(nm.x+nm.w,nm.y); ctx.lineTo(nm.x+nm.w,nm.y+nm.h); ctx.lineTo(m.x+m.w,m.y+m.h); ctx.fill(); ctx.stroke(); 
        }
    }
}

// (以下の関数はそのまま)
function initMapUI(){const a=document.getElementById('map-area');a.innerHTML="";for(let y=0;y<mapSize;y++)for(let x=0;x<mapSize;x++){let d=document.createElement('div');d.id=`cell-${x}-${y}`;d.className='cell cell-unknown';a.appendChild(d);}}
function updatePlayerVision(){[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}].forEach(o=>{let tx=playerPos.x+o.x,ty=playerPos.y+o.y;if(tx>=0&&tx<mapSize&&ty>=0&&ty<mapSize)visitedMaps[playerPos.floor][ty][tx]=true;});}
function renderMap(){const ar=["▲","▶","▼","◀"];const vis=visitedMaps[playerPos.floor];for(let y=0;y<mapSize;y++)for(let x=0;x<mapSize;x++){const c=document.getElementById(`cell-${x}-${y}`);c.innerText="";if(x===playerPos.x&&y===playerPos.y){c.className='cell cell-hero';c.innerText=ar[playerPos.dir];continue;}if(!vis[y][x]){c.className='cell cell-unknown';continue;}const v=currentMapData[y][x];if(v===1)c.className='cell cell-wall';else if(v===2)c.className='cell cell-stairs';else if(v===3)c.className='cell cell-boss';else if(v===9)c.className='cell cell-entrance';else c.className='cell cell-floor';}}
function log(m){const l=document.getElementById('log');l.innerHTML+=`<p>> ${m}</p>`;l.scrollTop=l.scrollHeight;}
function updateScreen(){if(!isBattle)draw3D();const d=["北","東","南","西"];document.getElementById('c-dir').innerText=d[playerPos.dir];document.getElementById('c-x').innerText=playerPos.x;document.getElementById('c-y').innerText=playerPos.y;
    document.getElementById('party-hp-0').innerText = party[0].hp; 
    document.getElementById('party-hp-1').innerText = party[1].hp;
    document.getElementById('party-hp-2').innerText = party[2].hp;
    const es=document.getElementById('enemy-stat');if(isBattle){es.style.visibility='visible';const n=document.getElementById('enemy-name');const p=(enemy.hp/enemy.maxHp)*100;if(p<=25)n.style.color='#f33';else if(p<=50)n.style.color='#ff3';else n.style.color='#fff';}else{es.style.visibility='hidden';}
}
function playVfx(t){const l=document.getElementById('vfx-layer'),e=document.getElementById('enemy-img'),m=document.getElementById('main-area');const d=document.createElement('div');if(t==='slash'||t==='fire'){d.className=(t==='slash')?'vfx-slash':'vfx-fire';e.classList.remove('shake-enemy');void e.offsetWidth;e.classList.add('shake-enemy');}else if(t==='heal')d.className='vfx-heal';else if(t==='damage'){d.className='vfx-damage';m.classList.remove('shake-screen');void m.offsetWidth;m.classList.add('shake-screen');}l.appendChild(d);setTimeout(()=>d.remove(),1000);}