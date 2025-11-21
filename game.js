// ==========================================
//  Yama RPG - Final Master Stable Version
// ==========================================

// -------------------------------------------------------
// 1. マップデータ定義
// -------------------------------------------------------
const mapSize = 10;

// 0:床, 1:壁, 2:階段, 3:ボス, 4:泉, 5:宝箱, 9:入口
const mapLevel1 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,5,0,1], // (7,1)宝箱
    [1,0,1,1,1,0,1,1,0,1],
    [1,0,1,2,0,0,0,0,0,1], // (3,3)階段
    [1,0,1,1,1,1,1,0,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,0,1],
    [1,5,0,0,0,0,0,1,0,1], // (1,7)宝箱
    [1,9,1,1,1,1,0,0,0,1], // (1,8)入口
    [1,1,1,1,1,1,1,1,1,1]
];
const mapLevel2 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,2,0,1,0,0,0,1,5,1], // (1,1)階段, (8,1)宝箱
    [1,0,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,1,0,0,0,1],
    [1,1,1,1,0,1,1,1,0,1],
    [1,5,0,0,0,0,0,0,0,1], // (1,5)宝箱
    [1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,1,0,0,0,1,2,0,1], // (7,8)階段
    [1,1,1,1,1,1,1,1,1,1]
];
const mapLevel3 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,0,0,0,1,0,1], // (1,1)階段
    [1,1,1,1,1,1,0,1,0,1],
    [1,4,0,0,0,0,0,0,0,1], // (1,3)泉
    [1,1,1,1,0,1,1,1,1,1],
    [1,0,0,0,0,0,0,5,0,1], // (7,5)宝箱
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,1,5,0,0,0,0,0,1], // (3,7)宝箱
    [1,0,1,1,1,1,0,1,2,1], // (8,8)階段
    [1,1,1,1,1,1,1,1,1,1]
];
const mapLevel4 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1,2,1], // (8,1)階段
    [1,0,1,1,1,1,0,1,0,1],
    [1,0,1,5,0,1,0,0,0,1], // (3,3)宝箱
    [1,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,0,1],
    [1,2,0,0,0,0,0,0,0,1], // (1,7)階段
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];
const mapLevel5 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,3,0,0,0,0,0,0,5,1], // (1,1)ボス, (8,1)宝箱
    [1,1,1,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,2,0,0,0,0,0,0,0,1], // (1,7)階段
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
];
const mapForest = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,3,0,0,0,1,0,0,0,1], // (1,1)グリフォン
    [1,1,1,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,9,1,1,1,1,1,1,0,1], // (1,8)入口
    [1,1,1,1,1,1,1,1,1,1]
];

// -------------------------------------------------------
// 2. ゲーム設定データ
// -------------------------------------------------------

// 宝箱配置
const chestData = { 
    "1_1_7": "w01", "1_7_1": "i01", 
    "2_1_5": "a02", "2_8_1": "h01", 
    "3_3_7": "i01", "3_7_5": "s02", 
    "4_3_3": "i04", 
    "5_8_1": "ac02" 
};

// 3D描画用座標データ (固定)
const VIEW_METRICS = [
    {x:0, y:0, w:300, h:200},    // 0: 目の前
    {x:60, y:40, w:180, h:120},  // 1: 1歩先
    {x:100, y:70, w:100, h:60},  // 2: 2歩先
    {x:120, y:85, w:60, h:30}    // 3: 3歩先
];

// ダンジョンテーマ
const dungeonThemes = {
    1: { ceil: "#1a1a1a", floor: "#3d342b", wallBaseRGB: [107, 91, 69], wallStroke: "#111" },
    2: { ceil: "#1a1a1a", floor: "#3d342b", wallBaseRGB: [107, 91, 69], wallStroke: "#111" },
    3: { ceil: "#222", floor: "#333", wallBaseRGB: [80, 80, 80], wallStroke: "#000" },
    4: { ceil: "#222", floor: "#333", wallBaseRGB: [80, 80, 80], wallStroke: "#000" },
    5: { ceil: "#2a0000", floor: "#1a051a", wallBaseRGB: [80, 30, 50], wallStroke: "#300" },
    100: { ceil: "#001100", floor: "#003300", wallBaseRGB: [34, 139, 34], wallStroke: "#002200" }
};

const spellNames = { flame: "フレイム", heal: "ヒール", double: "二段切り", escape: "エスケープ" };

const jobData = {
    hero: { 
        name: "勇者", baseStats: { str:10, int:8, pie:8, vit:8, agi:8, luc:9 }, 
        spells: { double:1, flame:1, heal:1, escape:0 }, 
        canEquip: ['sword','heavyShield','lightShield','armor','clothes','helm','hat','gauntlet','gloves','acc'], desc:"バランス型。" 
    },
    warrior: { 
        name: "戦士", baseStats: { str:12, int:6, pie:6, vit:10, agi:7, luc:7 }, 
        spells: { double:3, flame:0, heal:0, escape:0 }, 
        canEquip: ['sword','axe','heavyShield','lightShield','armor','clothes','helm','hat','gauntlet','gloves','acc'], desc:"高いHPと攻撃力。" 
    },
    mage: { 
        name: "魔法", baseStats: { str:6, int:12, pie:7, vit:6, agi:9, luc:8 }, 
        spells: { double:0, flame:5, heal:0, escape:1 }, 
        canEquip: ['staff','clothes','hat','gloves','lightShield','acc'], desc:"攻撃魔法が得意。" 
    },
    priest: { 
        name: "僧侶", baseStats: { str:7, int:8, pie:12, vit:7, agi:7, luc:8 }, 
        spells: { double:0, flame:0, heal:5, escape:0 }, 
        canEquip: ['mace','staff','lightShield','clothes','hat','gloves','acc'], desc:"回復魔法の専門家。" 
    }
};

const itemData = {
    w01: { name: "ショートソード", type: "weapon", subType: "sword", power: 4, price: 100 }, 
    w02: { name: "ロングソード", type: "weapon", subType: "sword", power: 8, price: 250 }, 
    w03: { name: "手斧", type: "weapon", subType: "axe", power: 6, price: 120 }, 
    w04: { name: "バトルアックス", type: "weapon", subType: "axe", power: 10, price: 300 }, 
    w05: { name: "メイス", type: "weapon", subType: "mace", power: 5, price: 150 }, 
    w06: { name: "木の杖", type: "weapon", subType: "staff", power: 2, price: 50 },
    a01: { name: "布の服", type: "armor", subType: "clothes", ac: 1, price: 50 }, 
    a02: { name: "皮の鎧", type: "armor", subType: "armor", ac: 3, price: 200 }, 
    a03: { name: "鎖カタビラ", type: "armor", subType: "armor", ac: 5, price: 500 },
    s01: { name: "バックラー", type: "shield", subType: "lightShield", ac: 2, price: 80 }, 
    s02: { name: "カイトシールド", type: "shield", subType: "heavyShield", ac: 4, price: 250 },
    h01: { name: "革の帽子", type: "helm", subType: "hat", ac: 1, price: 60 }, 
    h02: { name: "鉄の兜", type: "helm", subType: "helm", ac: 2, price: 180 },
    ac01: { name: "守りの指輪", type: "accessory", subType: "acc", ac: 4, price: 1000 }, 
    ac02: { name: "力の指輪", type: "accessory", subType: "acc", power: 4, price: 1000 },
    i01: { name: "傷薬", type: "consumable", effect: "heal", power: 20, price: 20, desc:"HP20回復" }, 
    i02: { name: "毒消し", type: "consumable", effect: "curePoison", price: 15, desc:"毒を直す" }, 
    i03: { name: "気付け薬", type: "consumable", effect: "curePara", price: 20, desc:"麻痺を直す" }, 
    i04: { name: "脱出の杖", type: "consumable", effect: "warp", price: 100, desc:"町へ戻る" }
};

// -------------------------------------------------------
// 3. グローバル変数
// -------------------------------------------------------

let party = [
    { id: "p1", name: "アベル", img: "abel.png", jobId: "hero", level: 1, exp: 0, hp: 0, maxHp: 0, stats: {}, alive: true, status: "normal", spells: {}, equips: { weapon:null, armor:null, shield:null, helm:null, acc:null } },
    { id: "p2", name: "メイ", img: "mei.png", jobId: "mage", level: 1, exp: 0, hp: 0, maxHp: 0, stats: {}, alive: true, status: "normal", spells: {}, equips: { weapon:null, armor:null, shield:null, helm:null, acc:null } },
    { id: "p3", name: "シーラ", img: "sheila.png", jobId: "priest", level: 1, exp: 0, hp: 0, maxHp: 0, stats: {}, alive: true, status: "normal", spells: {}, equips: { weapon:null, armor:null, shield:null, helm:null, acc:null } }
];

let partyInventory = [];
let partyGold = 100;
let openedChests = [];
let playerPos = { x: 1, y: 8, dir: 0, floor: 1 };
let currentMapData = mapLevel1;
let visitedMaps = { 1:[], 2:[], 3:[], 4:[], 5:[], 100:[] };
for(let f in visitedMaps) visitedMaps[f] = Array(mapSize).fill().map(()=>Array(mapSize).fill(false));

let enemy = { name: "", hp: 0, maxHp: 0, isBoss: false, isCharging: false, exp: 0, gold: 0 };
let isBattle = false;
let activeMemberIndex = 0;
let actionQueue = [];
let ctx = null;
let battleSpellMode = 'spell'; 
let menuReturnTo = 'town';
let templeTargetIndex = -1;
let selectedJobId = "";
let bonusPoints = 0;
let tempStatAlloc = {}; 

// -------------------------------------------------------
// 4. 初期化
// -------------------------------------------------------

window.onload = function() {
    party.forEach(p => { 
        initCharacter(p); 
        calculateStats(p); 
        p.hp = p.maxHp; 
    });

    loadMap(1);
    initMapUI();
    updateTownStatus();
    
    const canvas = document.getElementById('dungeon-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        updateDungeonUI();
    }
    
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('dungeon-scene').style.display === 'none') return;
        if (isBattle || document.getElementById('camp-overlay').style.display === 'flex') return;

        if(e.key==='ArrowUp'||e.key==='w') movePlayer('forward');
        if(e.key==='ArrowDown'||e.key==='s') movePlayer('backward');
        if(e.key==='ArrowLeft'||e.key==='a') turnPlayer('left');
        if(e.key==='ArrowRight'||e.key==='d') turnPlayer('right');
        if(e.key==='Enter') checkArea();
    });
};

function initCharacter(p) {
    const job = jobData[p.jobId];
    p.stats = { ...job.baseStats };
    p.spells = {};
    for(let key in job.spells) {
        p.spells[key] = { 
            name: spellNames[key], 
            max: job.spells[key], 
            current: job.spells[key] 
        };
    }
}

function calculateStats(p) {
    p.maxHp = Math.floor((p.stats.vit * p.level * 0.8) + 15);
    p.atk = p.stats.str;
    p.def = Math.floor(p.stats.agi / 2);
    for (let slot in p.equips) {
        const itemId = p.equips[slot];
        if (itemId) {
            const item = itemData[itemId];
            if (item.power) p.atk += item.power;
            if (item.ac) p.def += item.ac;
        }
    }
}

function getEquipString(id) {
    if(!id) return "なし";
    const it = itemData[id];
    let suffix = "";
    if(it.power) suffix += `(攻+${it.power})`;
    if(it.ac) suffix += `(防+${it.ac})`;
    return `${it.name} ${suffix}`;
}

function getEquipJobString(subType) {
    let jobNames = [];
    for(let jKey in jobData) {
        if(jobData[jKey].canEquip.includes(subType)) {
            jobNames.push(jobData[jKey].name);
        }
    }
    return jobNames.length > 0 ? `[${jobNames.join('/')}]` : "[装備不可]";
}

// -------------------------------------------------------
// 5. ゲーム進行・移動
// -------------------------------------------------------

function startGame() {
    document.getElementById('prologue-scene').style.display = 'none';
    document.getElementById('town-scene').style.display = 'block';
}

function loadMap(floorNum) {
    playerPos.floor = floorNum;
    if(floorNum===1) currentMapData=mapLevel1; 
    else if(floorNum===2) currentMapData=mapLevel2; 
    else if(floorNum===3) currentMapData=mapLevel3; 
    else if(floorNum===4) currentMapData=mapLevel4; 
    else if(floorNum===5) currentMapData=mapLevel5;
    else if(floorNum===100) currentMapData=mapForest;
    
    document.getElementById('floor-display').innerText = (floorNum===100) ? "試練の森" : `迷宮 B${floorNum}F`;
    checkObject();
}

// --- 町 ---
function updateTownStatus() {
    document.getElementById('town-gold').innerText = partyGold;
    const container = document.getElementById('town-status');
    container.innerHTML = '';
    party.forEach(p => {
        let html = `<div class="status-card"><img src="${p.img}" class="hero-icon-lg"><div class="status-info"><div><span class="job-badge">${jobData[p.jobId].name}</span> ${p.name}</div><div>Lv.${p.level}</div><div>HP: ${p.hp}/${p.maxHp}</div><div>EXP: ${p.exp}</div></div></div>`;
        container.innerHTML += html;
    });
    
    if(!document.getElementById('btn-forest')) {
        const menu = document.querySelector('.menu-list');
        const btn = document.createElement('button');
        btn.id = 'btn-forest';
        btn.className = 'btn menu-btn';
        btn.innerText = '⑤ 試練の森へ';
        btn.onclick = () => enterForest();
        menu.appendChild(btn);
    }
}
function townLog(msg) { const l = document.getElementById('town-log'); l.innerHTML += `<p>> ${msg}</p>`; l.scrollTop = l.scrollHeight; }
function townAction(act) {
    if (act === 'inn') {
        if (partyGold < 10) { townLog("お金が足りない！(10G)"); return; }
        partyGold -= 10;
        party.forEach(p => { p.hp = p.maxHp; p.alive = true; p.status = "normal"; for(let k in p.spells) p.spells[k].current = p.spells[k].max; });
        updateTownStatus(); townLog("宿に泊まった。");
    } else if (act === 'shop') openShop(); else if (act === 'temple') openTemple(); else if (act === 'dungeon') enterDungeon();
}

// --- コントロール ---
function toggleControls(mode) {
    document.getElementById('move-controls').style.display='none'; 
    document.getElementById('battle-controls').style.display='none'; 
    document.getElementById('spell-controls').style.display='none'; 
    document.getElementById('target-controls').style.display='none'; 
    
    if(mode==='battle') document.getElementById('battle-controls').style.display='grid';
    if(mode==='spell') document.getElementById('spell-controls').style.display='grid';
    if(mode==='target') document.getElementById('target-controls').style.display='grid';
    if(mode==='move') {
        document.getElementById('move-controls').style.display='grid'; 
        checkObject();
    }
}

// --- ダンジョン ---
function enterDungeon() {
    if (party.every(p => !p.alive)) { townLog("全滅しています。"); return; }
    document.getElementById('town-scene').style.display = 'none';
    document.getElementById('dungeon-scene').style.display = 'flex';
    loadMap(1); playerPos.x=1; playerPos.y=8; playerPos.dir=0;
    checkObject(); updatePlayerVision(); updateDungeonUI(); toggleControls('move');
}
function enterForest() {
    if (party.every(p => !p.alive)) { townLog("全滅しています。"); return; }
    document.getElementById('town-scene').style.display = 'none';
    document.getElementById('dungeon-scene').style.display = 'flex';
    loadMap(100); playerPos.x=1; playerPos.y=8; playerPos.dir=0;
    checkObject(); updatePlayerVision(); updateDungeonUI(); toggleControls('move');
    log("試練の森に入った...");
}

function updateDungeonUI() {
    if(!isBattle) draw3D();
    renderMap();
    const dNames=["北","東","南","西"];
    document.getElementById('c-dir').innerText=dNames[playerPos.dir];
    document.getElementById('c-x').innerText=playerPos.x;
    document.getElementById('c-y').innerText=playerPos.y;
    const container = document.getElementById('dungeon-party-status'); container.innerHTML = '';
    party.forEach(p => {
        let stBadge = p.status !== 'normal' ? `<span class="status-ailment">${p.status}</span>` : '';
        let hpColor = p.hp < p.maxHp * 0.3 ? '#ff5555' : '#fff';
        if(!p.alive) hpColor = '#888';
        container.innerHTML += `<div class="ps-row"><div><span class="job-badge-sm">${jobData[p.jobId].name.charAt(0)}</span>${p.name}${stBadge}</div><div style="color:${hpColor}">HP:${p.hp}</div></div>`;
    });
    checkObject();
}
function returnToTown(force=false) {
    if (isBattle && !force) return;
    if (!force && currentMapData[playerPos.y][playerPos.x] !== 9) { log("出口ではない！"); return; }
    document.getElementById('dungeon-scene').style.display = 'none'; document.getElementById('town-scene').style.display = 'block';
    updateTownStatus(); if(!force) townLog("町へ戻った。");
}

// --- 3D描画 ---
function draw3D(){
    if(!ctx) return;
    const theme = dungeonThemes[playerPos.floor] || dungeonThemes[1];
    ctx.fillStyle = theme.ceil; ctx.fillRect(0,0,300,100);
    ctx.fillStyle = theme.floor; ctx.fillRect(0,100,300,100);
    for(let d=3; d>=0; d--) drawLayer(d, theme);
}
function drawLayer(d, theme){
    const l = getRelPos(d,-1) === 1; const r = getRelPos(d,1) === 1; const f = getRelPos(d,0) === 1;
    const m = VIEW_METRICS[d]; const nm = (d < 3) ? VIEW_METRICS[d+1] : null;

    const i=1.0-(d*0.25); 
    const base = theme.wallBaseRGB; 
    const rv=Math.floor(base[0]*i), gv=Math.floor(base[1]*i), bv=Math.floor(base[2]*i);
    const wc=`rgb(${rv},${gv},${bv})`, sc=`rgb(${Math.floor(rv*0.7)},${Math.floor(gv*0.7)},${Math.floor(bv*0.7)})`;
    ctx.lineWidth=2; ctx.strokeStyle=theme.wallStroke;

    if(f){ ctx.fillStyle=wc; ctx.fillRect(m.x,m.y,m.w,m.h); ctx.strokeRect(m.x,m.y,m.w,m.h); }
    else if(d < 3 && nm){ 
        if(l){ctx.fillStyle=sc;ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(nm.x,nm.y);ctx.lineTo(nm.x,nm.y+nm.h);ctx.lineTo(m.x,m.y+m.h);ctx.fill();ctx.stroke();} 
        if(r){ctx.fillStyle=sc;ctx.beginPath();ctx.moveTo(m.x+m.w,m.y);ctx.lineTo(nm.x+nm.w,nm.y);ctx.lineTo(nm.x+nm.w,nm.y+nm.h);ctx.lineTo(m.x+m.w,m.y+m.h);ctx.fill();ctx.stroke();} 
    }
    
    let checkX = playerPos.x, checkY = playerPos.y, dir = playerPos.dir;
    if(dir===0) checkY-=d; else if(dir===1) checkX+=d; else if(dir===2) checkY+=d; else if(dir===3) checkX-=d;
    
    let mapVal = 0; 
    if(checkX>=0 && checkX<mapSize && checkY>=0 && checkY<mapSize) mapVal = currentMapData[checkY][checkX];
    
    if([2,3,4,5].includes(mapVal)) {
        const iconSize = m.w * 0.6; const iconX = m.x + (m.w - iconSize) / 2; const iconY = m.y + (m.h - iconSize) / 2; 
        let type = 'event'; if(mapVal===2) type='ladder'; else if(mapVal===3) type='boss'; else if(mapVal===5) type='chest'; 
        drawIcon(ctx, iconX, iconY, iconSize, type);
    }
}
function drawIcon(ctx, x, y, size, type) {
    ctx.save();
    if(type === 'ladder') {
        ctx.strokeStyle = '#8B4513'; ctx.lineWidth = Math.max(1, size/15); ctx.beginPath();
        ctx.moveTo(x + size*0.25, y); ctx.lineTo(x + size*0.25, y + size); ctx.moveTo(x + size*0.75, y); ctx.lineTo(x + size*0.75, y + size);
        for(let i=1; i<=5; i++) { const ry = y + (size * i / 6); ctx.moveTo(x + size*0.25, ry); ctx.lineTo(x + size*0.75, ry); } ctx.stroke();
    } else if(type === 'chest') {
        ctx.fillStyle = '#DAA520'; ctx.fillRect(x, y+size/2, size, size/2);
        ctx.lineWidth = 2; ctx.strokeStyle = '#000'; ctx.strokeRect(x, y+size/2, size, size/2);
        ctx.beginPath(); ctx.arc(x+size/2, y+size/2, size/8, 0, Math.PI*2); ctx.fillStyle='#000'; ctx.fill();
    } else {
        const color = type === 'boss' ? '255,50,50' : '50,100,255';
        const grad = ctx.createRadialGradient(x+size/2, y+size/2, size/10, x+size/2, y+size/2, size/1.8);
        grad.addColorStop(0, `rgba(${color}, 0.8)`); grad.addColorStop(0.6, `rgba(${color}, 0.4)`); grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(x+size/2, y+size/2, size/1.8, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
}
function getRelPos(f,s){
    let x=playerPos.x, y=playerPos.y, d=playerPos.dir;
    if(d===0)y-=f; if(d===1)x+=f; if(d===2)y+=f; if(d===3)x-=f;
    if(d===0)x+=s; if(d===1)y+=s; if(d===2)x-=s; if(d===3)y-=s;
    if(x<0||x>=mapSize||y<0||y>=mapSize) return 1;
    return(currentMapData[y][x]===1)?1:0;
}

// --- Menus ---
function openCamp(from) { 
    menuReturnTo = from || 'camp'; 
    const inDungeon = document.getElementById('dungeon-scene').style.display === 'flex';
    document.getElementById('btn-camp-check').style.display = inDungeon ? 'block' : 'none';
    if(inDungeon) document.getElementById('move-controls').style.display = 'none';
    document.getElementById('camp-overlay').style.display='flex'; 
}
function closeCamp() { 
    document.getElementById('camp-overlay').style.display='none';
    if(document.getElementById('dungeon-scene').style.display === 'flex') { toggleControls('move'); }
}
function checkAreaCamp() { closeCamp(); checkArea(); }

function openCampSpellMenu() {
    document.getElementById('camp-overlay').style.display = 'none';
    showSubMenu(party.map((p, i) => {
        const disabled = !p.alive ? "disabled style='color:#888'" : ""; 
        return `<button class="btn" ${disabled} onclick="showCampSpellList(${i})">${p.name}</button>`;
    }).join(''), "誰が唱える？");
}
function showCampSpellList(actorIdx) {
    const p = party[actorIdx];
    let html = "";
    const spellsToShow = ['heal', 'escape'];
    spellsToShow.forEach(key => {
        if(p.spells[key] && p.spells[key].max > 0) {
            const s = p.spells[key];
            const disabled = s.current <= 0 ? "disabled" : "";
            html += `<button class="btn" ${disabled} onclick="selectCampSpellTarget(${actorIdx}, '${key}')">✨ ${s.name} (${s.current}/${s.max})</button>`;
        }
    });
    if (html === "") html = "<div style='grid-column:1/-1; padding:20px; color:#888;'>使える呪文がない</div>";
    showSubMenu(html, `${p.name}の呪文`);
}
function selectCampSpellTarget(actorIdx, spellKey) {
    const p = party[actorIdx];
    if (p.spells[spellKey].current <= 0) return;
    if (spellKey === 'escape') { executeCampSpell(actorIdx, null, spellKey); return; }
    showSubMenu(party.map((t, i) => {
        const hpColor = t.hp < t.maxHp ? "#8f8" : "#fff";
        return `<button class="btn" onclick="executeCampSpell(${actorIdx}, ${i}, '${spellKey}')"><span style="color:${hpColor}">${t.name}</span> (HP:${t.hp}/${t.maxHp})</button>`;
    }).join(''), "誰にかける？");
}
function executeCampSpell(actorIdx, targetIdx, spellKey) {
    const actor = party[actorIdx];
    const spell = actor.spells[spellKey];
    spell.current--;
    if (spellKey === 'heal') {
        const target = party[targetIdx];
        let rec = 20 + actor.stats.pie;
        target.hp += rec; if (target.hp > target.maxHp) target.hp = target.maxHp;
        if (!target.alive) target.alive = true; 
        alert(`${target.name}のHPが ${rec} 回復した！`);
    } else if (spellKey === 'escape') {
        alert("脱出した！"); closeSubMenu(); closeCamp(); returnToTown(true); return;
    }
    if (document.getElementById('dungeon-scene').style.display === 'flex') updateDungeonUI(); else updateTownStatus();
    if (spell.current > 0) showCampSpellList(actorIdx); else openCampSpellMenu();
}

function openEquipMenu(from) { if(from) menuReturnTo=from; document.getElementById('camp-overlay').style.display='none'; showSubMenu(party.map((p,i) => `<button class="btn" onclick="showEquipChar(${i})">${p.name}</button>`).join(''), "装備変更"); }
function showEquipChar(idx) { templeTargetIndex = idx; const p = party[idx]; const slots = { weapon:'武器', shield:'盾', armor:'鎧', helm:'兜', acc:'装飾' }; let html = `<div style="grid-column:1/-1;color:#fff;text-align:center;">${p.name}の装備</div>`; for(let s in slots) { let eqName = p.equips[s] ? itemData[p.equips[s]].name : "なし"; html += `<button class="btn" onclick="equipSlot('${s}')">${slots[s]}: ${eqName}</button>`; } showSubMenu(html, "装備選択"); }
function equipSlot(slot) { const p = party[templeTargetIndex]; const job = jobData[p.jobId]; const candidates = partyInventory.filter(id => { const it = itemData[id]; let typeMatch = false; if(slot==='weapon' && it.type==='weapon') typeMatch=true; if(slot==='armor' && it.type==='armor') typeMatch=true; if(slot==='shield' && it.type==='shield') typeMatch=true; if(slot==='helm' && it.type==='helm') typeMatch=true; if(slot==='acc' && it.type==='accessory') typeMatch=true; return typeMatch && job.canEquip.includes(it.subType); }); let html = `<button class="btn" onclick="doEquip(null, '${slot}')">外す</button>`; html += candidates.map(id => { let powerStr = ""; if(itemData[id].power) powerStr = `攻${itemData[id].power}`; if(itemData[id].ac) powerStr = `防${itemData[id].ac}`; return `<button class="btn" onclick="doEquip('${id}', '${slot}')">${itemData[id].name} ${powerStr}</button>` }).join(''); if(candidates.length===0) html += `<div style="color:#aaa; grid-column:1/-1; text-align:center;">装備できるものがない</div>`; showSubMenu(html, "アイテム選択"); }
function doEquip(itemId, slot) { const p = party[templeTargetIndex]; if(p.equips[slot]) partyInventory.push(p.equips[slot]); p.equips[slot] = itemId; if(itemId) { const idx = partyInventory.indexOf(itemId); if(idx > -1) partyInventory.splice(idx, 1); } calculateStats(p); alert("装備しました"); showEquipChar(templeTargetIndex); }
function openItemMenu() { if(partyInventory.length === 0) return alert("何も持っていない"); document.getElementById('camp-overlay').style.display='none'; const unique = [...new Set(partyInventory)]; const html = unique.map(id => { const count = partyInventory.filter(x => x===id).length; const it = itemData[id]; let typeStr = it.type === 'consumable' ? '道具' : '装備'; return `<button class="btn" style="font-size:0.8em;text-align:left;" onclick="selectItemTarget('${id}')">${it.name} x${count}<br><span style="color:#aaa;">${it.type!=='consumable'?getEquipJobString(it.subType):'[道具]'}</span></button>`; }).join(''); showSubMenu(html, "アイテム一覧"); }
function selectItemTarget(itemId) { const it = itemData[itemId]; if(it.type !== 'consumable') { alert(`これは${it.name}です。装備メニューから装備してください。`); return; } if(battleSpellMode === 'item') { document.getElementById('sub-menu-overlay').style.display='none'; toggleControls('target'); ['btn-target-0','btn-target-1','btn-target-2'].forEach((id,i) => { document.getElementById(id).innerText=`${party[i].name}`; document.getElementById(id).onclick = () => executeBattleItem(itemId, i); }); return; } if(it.effect === 'warp') { useItem(itemId, null); return; } showSubMenu(party.map((p,i) => `<button class="btn" onclick="useItem('${itemId}', ${i})">${p.name}</button>`).join(''), "誰に使う？"); }
function useItem(itemId, targetIdx) { const item = itemData[itemId]; const invIdx = partyInventory.indexOf(itemId); if(invIdx > -1) partyInventory.splice(invIdx, 1); if(item.effect === 'warp') { alert("光に包まれた！"); closeSubMenu(); closeCamp(); returnToTown(true); return; } const t = party[targetIdx]; if(item.effect === 'heal') { t.hp += item.power; if(t.hp > t.maxHp) t.hp = t.maxHp; alert(`${t.name}は回復した`); } else if(item.effect === 'curePoison') { if(t.status === 'poison') { t.status='normal'; alert("毒が消えた"); } else alert("効果がなかった"); } else if(item.effect === 'curePara') { if(t.status === 'paralyze') { t.status='normal'; alert("麻痺が治った"); } else alert("効果がなかった"); } if(document.getElementById('dungeon-scene').style.display === 'flex') updateDungeonUI(); else updateTownStatus(); openItemMenu(); }
function showSubMenu(html, title) { document.getElementById('sub-menu-overlay').style.display='flex'; document.getElementById('sub-menu-title').innerText = title; document.getElementById('sub-menu-content').innerHTML = html; }
function closeSubMenu() { document.getElementById('sub-menu-overlay').style.display='none'; if(battleSpellMode !== 'item') { document.getElementById('camp-overlay').style.display='flex'; } else { toggleControls('battle'); battleSpellMode = 'spell'; } }
function openStatusMenu() { document.getElementById('camp-overlay').style.display = 'none'; document.getElementById('status-scene').style.display = 'flex'; const con = document.getElementById('status-content'); con.innerHTML = ''; party.forEach(p => { let w = getEquipString(p.equips.weapon); let a = getEquipString(p.equips.armor); let s = getEquipString(p.equips.shield); let h = getEquipString(p.equips.helm); let ac = getEquipString(p.equips.acc); let nextExp = (p.level * 100) - p.exp; let html = `<div class="status-card" style="display:block;"><div style="display:flex; align-items:center; border-bottom:1px solid #555; margin-bottom:5px; padding-bottom:5px;"><img src="${p.img}" class="hero-icon-lg" style="width:40px;height:40px;margin-right:10px;"><div style="font-weight:bold; color:#ffd700;">${p.name} (Lv.${p.level} ${jobData[p.jobId].name})</div></div><div class="detail-stats"><div>HP: ${p.hp}/${p.maxHp}</div><div>攻: ${p.atk} / 防: ${p.def}</div><div>力: ${p.stats.str}</div><div>知: ${p.stats.int}</div><div>信: ${p.stats.pie}</div><div>生: ${p.stats.vit}</div><div>速: ${p.stats.agi}</div><div>運: ${p.stats.luc}</div></div><div style="font-size:0.8em; margin-top:5px; color:#88ff88;">次のレベルまで: ${nextExp} EXP</div><div style="font-size:0.8em; margin-top:5px; color:#aaa;">武器: ${w}<br>盾: ${s}<br>鎧: ${a}<br>兜: ${h}<br>装飾: ${ac}</div></div>`; con.innerHTML += html; }); }
function closeStatusMenu() { document.getElementById('status-scene').style.display = 'none'; document.getElementById('camp-overlay').style.display = 'flex'; }
function openShop() { document.getElementById('town-scene').style.display = 'none'; document.getElementById('shop-scene').style.display = 'block'; updateShopUI(); }
function exitShop() { document.getElementById('shop-scene').style.display = 'none'; document.getElementById('town-scene').style.display = 'block'; updateTownStatus(); }
function updateShopUI() { document.getElementById('shop-gold').innerText = partyGold; const list = document.getElementById('shop-list'); list.innerHTML = ''; for (let id in itemData) { const item = itemData[id]; let stats = ""; if(item.type!=='consumable'){ if(item.power) stats += `攻+${item.power} `; if(item.ac) stats += `防+${item.ac} `; stats+=getEquipJobString(item.subType); } if(item.effect) stats += `効果:${item.desc} `; const div = document.createElement('div'); div.className = 'shop-item'; div.innerHTML = `<div>${item.name} (${item.price}G)<br><span class="shop-desc">${stats}</span></div> <button class="btn" onclick="buyItem('${id}')">購入</button>`; list.appendChild(div); } }
function buyItem(id) { const item = itemData[id]; if (partyGold >= item.price) { partyGold -= item.price; partyInventory.push(id); alert(`${item.name}を購入しました。`); updateShopUI(); } else alert("お金が足りません。"); }
function openTemple() { document.getElementById('town-scene').style.display='none'; document.getElementById('temple-scene').style.display='block'; document.getElementById('temple-members').innerHTML = party.map((p,i) => `<button class="btn" id="tm-char-${i}" onclick="selectTempleMember(${i})">${p.name}</button>`).join(''); document.getElementById('job-select-area').style.display='none'; document.getElementById('levelup-area').style.display='none'; templeTargetIndex = -1; }
function exitTemple() { document.getElementById('temple-scene').style.display='none'; document.getElementById('town-scene').style.display='block'; updateTownStatus(); }
function selectTempleMember(idx) { templeTargetIndex = idx; for(let i=0; i<3; i++) document.getElementById(`tm-char-${i}`).classList.remove('btn-selected'); document.getElementById(`tm-char-${idx}`).classList.add('btn-selected'); }
function showJobChange() { if(templeTargetIndex===-1) return alert("誰を？"); document.getElementById('job-select-area').style.display='block'; document.getElementById('levelup-area').style.display='none'; const jobs = ['hero','mage','priest','warrior']; document.getElementById('job-buttons').innerHTML = jobs.map(j => `<button class="btn job-btn" onclick="selectJob('${j}')">${jobData[j].name}</button>`).join(''); }
function selectJob(jid) { selectedJobId = jid; document.getElementById('job-desc').innerText = jobData[jid].desc; }
function executeClassChange() { if(!selectedJobId) return; const p = party[templeTargetIndex]; p.jobId = selectedJobId; p.level = 1; p.exp = 0; initCharacter(p); calculateStats(p); p.hp = p.maxHp; alert("転職しました！"); openTemple(); }
function checkLevelUp() { if(templeTargetIndex===-1) return alert("誰を？"); const p = party[templeTargetIndex]; const req = p.level * 100; if (p.exp >= req) { bonusPoints = 1; tempStatAlloc={str:0,int:0,pie:0,vit:0,agi:0,luc:0}; document.getElementById('job-select-area').style.display='none'; document.getElementById('levelup-area').style.display='block'; renderLevelUpStats(); updateBonusUI(); } else alert(`経験値が足りません (あと ${req - p.exp})`); }
function renderLevelUpStats() { const p = party[templeTargetIndex]; const stats = ['str','int','pie','vit','agi','luc']; const lbl = {str:'力',int:'知恵',pie:'信仰',vit:'生命',agi:'素早',luc:'運'}; let html = ''; stats.forEach(s => { html += `<div style="display:flex;justify-content:space-between;margin:5px 0;"><span>${lbl[s]}: ${p.stats[s]} <span style="color:#ff3">+${tempStatAlloc[s]}</span></span><button class="btn" style="padding:2px 10px;" onclick="addStat('${s}')">+</button></div>`; }); document.getElementById('levelup-stats').innerHTML = html; }
function addStat(s) { if(bonusPoints > 0) { tempStatAlloc[s]++; bonusPoints--; updateBonusUI(); renderLevelUpStats(); } }
function updateBonusUI() { document.getElementById('bonus-points').innerText = bonusPoints; }
function executeLevelUp() { if(bonusPoints > 0) return alert("ポイントを使い切ってください"); const p = party[templeTargetIndex]; const req = p.level * 100; p.level++; p.exp -= req; for(let k in tempStatAlloc)p.stats[k]+=tempStatAlloc[k]; p.maxHp += Math.floor(p.stats.vit/2); for(let k in p.spells) {if(p.spells[k].max > 0) p.spells[k].max += 1;} calculateStats(p); alert("レベルアップしました！"); openTemple(); }

// Battle
function movePlayer(t) { if(isBattle)return; let dx=0, dy=0, d=playerPos.dir; if(t==='forward'){if(d===0)dy=-1;if(d===1)dx=1;if(d===2)dy=1;if(d===3)dx=-1;} else {if(d===0)dy=1;if(d===1)dx=-1;if(d===2)dy=-1;if(d===3)dx=1;} executeMove(dx,dy); }
function turnPlayer(d) { if(isBattle)return; if(d==='left')playerPos.dir=(playerPos.dir+3)%4; if(d==='right')playerPos.dir=(playerPos.dir+1)%4; updateDungeonUI(); }
function executeMove(dx, dy) { const nx=playerPos.x+dx, ny=playerPos.y+dy; if(nx<0||nx>=mapSize||ny<0||ny>=mapSize){ log("行き止まりだ。"); return; } if(currentMapData[ny][nx]===1){ visitedMaps[playerPos.floor][ny][nx]=true; log("壁だ。"); updateDungeonUI(); return; } playerPos.x=nx; playerPos.y=ny; checkObject(); updatePlayerVision(); updateDungeonUI(); party.forEach(p => { if(p.status==='poison' && p.alive) { p.hp -= 1; if(p.hp<=0) { p.hp=0; p.alive=false; log(`${p.name}は毒で倒れた...`); } } }); updateDungeonUI(); if(currentMapData[ny][nx]===3){ log("⚠️ 殺気を感じる..."); setTimeout(startBossBattle,1500); return; } if(currentMapData[ny][nx]===4){ performEvent(); } if(currentMapData[ny][nx]!==9 && currentMapData[ny][nx]!==2 && currentMapData[ny][nx]!==4 && currentMapData[ny][nx]!==5 && Math.random()<0.15) startBattle(); }
function checkObject() { document.getElementById('btn-return').style.display=(currentMapData[playerPos.y][playerPos.x]===9)?'block':'none'; }
function checkArea() { if(isBattle)return; const v=currentMapData[playerPos.y][playerPos.x]; if(v===9)log("出口だ。"); else if(v===2){ if(playerPos.floor===1){loadMap(2);playerPos.x=1;playerPos.y=1;} else if(playerPos.floor===2){if(playerPos.x===1&&playerPos.y===1){loadMap(1);playerPos.x=3;playerPos.y=3;}else{loadMap(3);playerPos.x=1;playerPos.y=1;}} else if(playerPos.floor===3){if(playerPos.x===1&&playerPos.y===1){loadMap(2);playerPos.x=7;playerPos.y=8;}else{loadMap(4);playerPos.x=8;playerPos.y=1;}} else if(playerPos.floor===4){if(playerPos.x===8&&playerPos.y===1){loadMap(3);playerPos.x=8;playerPos.y=8;}else{loadMap(5);playerPos.x=1;playerPos.y=7;}} else if(playerPos.floor===5){loadMap(4);playerPos.x=1;playerPos.y=7;} updatePlayerVision(); updateDungeonUI(); } else if(v===5) { const key = `${playerPos.floor}_${playerPos.x}_${playerPos.y}`; if(!openedChests.includes(key) && chestData[key]) { const itemId = chestData[key]; partyInventory.push(itemId); openedChests.push(key); alert(`${itemData[itemId].name}を手に入れた！`); } else log("宝箱は空だ。"); } else if(v===4) performEvent(); else log("特に何もない。"); }
function performEvent() { log("神秘的な泉がある... 水を飲んだ。"); party.forEach(p => { p.hp = p.maxHp; p.status='normal'; }); alert("全員のHPと状態異常が回復した！"); }

function startBattle() {
    let monsters = [];
    if(playerPos.floor===1) monsters=[{name:"スライム",hp:15,img:"slime.png",exp:5,gold:10},{name:"ゴブリン",hp:20,img:"goblin.png",exp:8,gold:20}];
    else if(playerPos.floor===2) monsters=[{name:"ゴブリン",hp:20,img:"goblin.png",exp:8,gold:20},{name:"オーク",hp:40,img:"orc.png",exp:15,gold:40}];
    else if(playerPos.floor<=4) monsters=[{name:"オーク",hp:40,img:"orc.png",exp:15,gold:40},{name:"スケルトン",hp:50,img:"skeleton.png",exp:25,gold:80}];
    else if(playerPos.floor===5) monsters=[{name:"スケルトン",hp:50,img:"skeleton.png",exp:25,gold:80},{name:"ゴースト",hp:40,img:"ghost.png",exp:30,gold:100,type:"ghost"}];
    else if(playerPos.floor===100) monsters=[{name:"トレント",hp:80,img:"treant.png",exp:50,gold:150},{name:"シルフ",hp:60,img:"sylph.png",exp:40,gold:120}];
    let e = monsters[Math.floor(Math.random()*monsters.length)];
    setupEnemy(e, false); log(`${enemy.name} が出現した！`);
}
function startBossBattle() { 
    if(playerPos.floor===100) {
        setupEnemy({ name: "グリフォン", hp: 500, img: "griffin.png", exp:3000, gold:5000 }, true);
        log("🦅 グリフォンが襲いかかってきた！！！");
    } else {
        setupEnemy({ name: "ドラゴン", hp: 300, img: "dragon.png", exp:1000, gold:5000 }, true);
        log("🔥 ドラゴンが出現した！！！");
    }
}
function setupEnemy(data, isBoss) { isBattle=true; enemy = { ...data, maxHp:data.hp, isBoss:isBoss, isCharging:false }; document.getElementById('enemy-img').src=data.img; document.getElementById('enemy-img').style.display='block'; if(ctx){ctx.fillStyle="rgba(0,0,0,0.7)";ctx.fillRect(0,0,300,200);} document.getElementById('enemy-stat').style.visibility='visible'; document.getElementById('enemy-name').innerText=enemy.name; document.getElementById('battle-msg').style.display='block'; actionQueue=[]; party.forEach(p => p.isDefending = false); activeMemberIndex=0; startInputPhase(true); }
function startInputPhase(isFirst=false) { if(!isFirst) activeMemberIndex++; if(activeMemberIndex >= party.length) { executeTurnActions(); return; } const p = party[activeMemberIndex]; if(!p.alive) { startInputPhase(); return; } if(p.status === 'paralyze') { log(`${p.name}は麻痺して動けない！`); actionQueue.push({type:'wait', actorIndex:activeMemberIndex, name:p.name}); startInputPhase(); return; } document.getElementById('battle-msg').innerText = `▶ ${p.name} のコマンド`; toggleControls('battle'); }
function fight(act) { const p = party[activeMemberIndex]; if(act==='run') { if(enemy.isBoss || Math.random()<0.5) { log("逃げられなかった！"); actionQueue.push({type:'wait',actorIndex:activeMemberIndex}); } else { log("逃げ切った！"); endBattle(); return; } } else if(act==='attack') actionQueue.push({type:'attack', actorIndex:activeMemberIndex, name:p.name}); else if(act==='defend') actionQueue.push({type:'defend', actorIndex:activeMemberIndex, name:p.name}); startInputPhase(); }
function castSpell(type) { const p = party[activeMemberIndex]; if(p.spells[type].current <= 0) return; battleSpellMode = 'spell'; if(type==='heal') { toggleControls('target'); ['btn-target-0','btn-target-1','btn-target-2'].forEach((id,i) => { document.getElementById(id).innerText=`${party[i].name}(${party[i].hp})`; document.getElementById(id).onclick = () => executeHeal(i); }); } else { actionQueue.push({type:type, actorIndex:activeMemberIndex, name:p.name}); startInputPhase(); } }
function openBattleItemMenu() { menuReturnTo = 'battle'; battleSpellMode = 'item'; openItemMenu(); }
function executeBattleItem(itemId, targetIdx) { const invIdx = partyInventory.indexOf(itemId); if(invIdx > -1) partyInventory.splice(invIdx, 1); actionQueue.push({type:'item', actorIndex:activeMemberIndex, targetIndex:targetIdx, itemId:itemId, name:party[activeMemberIndex].name}); startInputPhase(); }
function executeHeal(idx) { actionQueue.push({type:'heal', actorIndex:activeMemberIndex, targetIndex:idx, name:party[activeMemberIndex].name}); startInputPhase(); }
function openSpellMenu() { toggleControls('spell'); const p = party[activeMemberIndex]; const setBtn = (id, spell) => { const b = document.getElementById(id); if(p.spells[spell] && p.spells[spell].max > 0) { b.style.display='inline-block'; b.innerText=`${p.spells[spell].name}(${p.spells[spell].current})`; b.disabled=p.spells[spell].current<=0; } else b.style.display='none'; }; setBtn('btn-spell-flame','flame'); setBtn('btn-spell-heal','heal'); setBtn('btn-skill-double','double'); setBtn('btn-spell-escape','escape'); }
function closeSpellMenu() { toggleControls('battle'); }
function executeTurnActions() { toggleControls('none'); document.getElementById('battle-msg').innerText = "⚔️ 戦闘中..."; processQueue(); }
function processQueue() { if(enemy.hp<=0) { checkWin(); return; } if(actionQueue.length===0) { setTimeout(enemyTurn, 500); return; } const act = actionQueue.shift(); const actor = party[act.actorIndex]; if(!actor.alive) { processQueue(); return; } if(act.type==='defend') { actor.isDefending=true; document.getElementById('battle-msg').innerText = `🛡️ ${actor.name} は防御`; log(`${actor.name}は防御した`); } else if(act.type==='wait') {} else if(act.type==='attack') { document.getElementById('battle-msg').innerText = `⚔️ ${actor.name} の攻撃`; playVfx('slash'); let dmg = Math.max(1, actor.atk - Math.floor(Math.random()*2)); if(enemy.type === 'ghost') { dmg = Math.floor(dmg * 0.2); log("物理攻撃が効きにくい！"); } enemy.hp -= dmg; log(`${actor.name}の攻撃！ ${dmg}ダメ`); } else if(act.type==='flame') { document.getElementById('battle-msg').innerText = `🔥 ${actor.name} のフレイム`; actor.spells.flame.current--; playVfx('fire'); let dmg = 15 + actor.stats.int; enemy.hp -= dmg; log(`${actor.name}のフレイム！ ${dmg}ダメ`); } else if(act.type==='double') { document.getElementById('battle-msg').innerText = `⚔️ ${actor.name} の二段切り`; actor.spells.double.current--; playVfx('slash'); let dmg = (actor.atk * 2); if(enemy.type === 'ghost') dmg = Math.floor(dmg*0.2); enemy.hp -= dmg; log(`${actor.name}の二段切り！ ${dmg}ダメ`); } else if(act.type==='heal') { document.getElementById('battle-msg').innerText = `✨ ${actor.name} のヒール`; actor.spells.heal.current--; playVfx('heal'); const t = party[act.targetIndex]; let rec = 20 + actor.stats.pie; t.hp += rec; if(t.hp>t.maxHp) t.hp=t.maxHp; if(!t.alive){ t.alive=true; log(`${t.name}が蘇生した`); } else log(`${t.name}が回復した`); } else if(act.type==='escape') { document.getElementById('battle-msg').innerText = `💨 ${actor.name} のエスケープ`; actor.spells.escape.current--; log(`${actor.name}はエスケープを唱えた！`); endBattle(); returnToTown(true); return; } else if(act.type==='item') { const item = itemData[act.itemId]; const t = party[act.targetIndex]; document.getElementById('battle-msg').innerText = `💊 ${actor.name} は ${item.name} を使用`; if(item.effect === 'heal') { playVfx('heal'); t.hp += item.power; if(t.hp > t.maxHp) t.hp = t.maxHp; log(`${t.name}のHPが回復した`); } else if(item.effect === 'curePoison') { if(t.status==='poison') {t.status='normal'; log("毒が消えた");} else log("効果がなかった"); } else if(item.effect === 'curePara') { if(t.status==='paralyze') {t.status='normal'; log("麻痺が治った");} else log("効果がなかった"); } } updateDungeonUI(); setTimeout(processQueue, 800); }
function checkWin() { if(enemy.hp<=0) { document.getElementById('enemy-img').style.opacity=0; log(`${enemy.name}を倒した！ EXP:${enemy.exp} Gold:${enemy.gold}`); partyGold += enemy.gold; party.forEach(p => { if(p.alive) p.exp += enemy.exp; }); if(enemy.isBoss) setTimeout(gameClear,1000); else setTimeout(endBattle,1000); } }
function enemyTurn() { if(party.every(p=>!p.alive)) { gameOver(); return; } if(enemy.isBoss && enemy.isCharging) { enemy.isCharging=false; playVfx('fire'); log("ドラゴンの超強力な一撃！"); let t = getRandomTarget(); if(t) takeDamage(t, 60); finishEnemyTurn(); return; } if(enemy.isBoss && Math.random()<0.3) { enemy.isCharging=true; log("ドラゴンは力を溜めている..."); finishEnemyTurn(); return; } playVfx('damage'); let t = getRandomTarget(); if(t) { let dmg = 5 + (playerPos.floor * 3); if(enemy.isBoss) dmg += 15; takeDamage(t, dmg); if(enemy.name==="スライム" && Math.random()<0.3) { t.status='poison'; log(`${t.name}は毒を受けた！`); } } finishEnemyTurn(); }
function getRandomTarget() { const alive = party.filter(p=>p.alive); if(alive.length===0) return null; return alive[Math.floor(Math.random()*alive.length)]; }
function takeDamage(target, dmg) { if(target.isDefending) dmg = Math.floor(dmg/2); dmg -= Math.floor(target.def/2); if(dmg<1) dmg=1; target.hp -= dmg; log(`${target.name}に${dmg}のダメージ`); if(target.hp<=0) { target.hp=0; target.alive=false; log(`${target.name}は倒れた`); } updateDungeonUI(); }
function finishEnemyTurn() { if(party.every(p=>!p.alive)) setTimeout(gameOver,1000); else { activeMemberIndex=0; setTimeout(()=>startInputPhase(true), 1000); } }
function endBattle() { isBattle=false; document.getElementById('enemy-img').style.display='none'; document.getElementById('enemy-stat').style.visibility='hidden'; document.getElementById('battle-msg').style.display='none'; document.getElementById('enemy-img').style.opacity=1; updateDungeonUI(); toggleControls('move'); }
function gameOver() { log("全滅しました..."); setTimeout(()=>{ isBattle=false; endBattle(); returnToTown(true); party.forEach(p=>{p.hp=1;p.alive=true;p.status='normal';}); partyGold = Math.floor(partyGold/2); townLog("全滅した... 所持金が半分になった。"); updateTownStatus(); },2000); }
function gameClear() { alert("ドラゴンを討伐した！\n町へ戻ります。"); endBattle(); returnToTown(true); townLog("ドラゴンを討伐し、英雄として迎えられた！"); }
function getRelPos(f,s){let x=playerPos.x,y=playerPos.y,d=playerPos.dir;if(d===0)y-=f;if(d===1)x+=f;if(d===2)y+=f;if(d===3)x-=f;if(d===0)x+=s;if(d===1)y+=s;if(d===2)x-=s;if(d===3)y-=s;if(x<0||x>=mapSize||y<0||y>=mapSize)return 1;return(currentMapData[y][x]===1)?1:0;}
function getEquipJobString(subType) { let jobNames = []; for(let jKey in jobData) { if(jobData[jKey].canEquip.includes(subType)) jobNames.push(jobData[jKey].name); } return jobNames.length > 0 ? `[${jobNames.join('/')}]` : "[装備不可]"; }
function playVfx(t){const l=document.getElementById('vfx-layer'),e=document.getElementById('enemy-img'),m=document.getElementById('main-area');const d=document.createElement('div');if(t==='slash'||t==='fire'){d.className=(t==='slash')?'vfx-slash':'vfx-fire';e.classList.remove('shake-enemy');void e.offsetWidth;e.classList.add('shake-enemy');}else if(t==='heal')d.className='vfx-heal';else if(t==='damage'){d.className='vfx-damage';m.classList.remove('shake-screen');void m.offsetWidth;m.classList.add('shake-screen');}l.appendChild(d);setTimeout(()=>d.remove(),1000);}
function initMapUI(){const a=document.getElementById('map-area');a.innerHTML="";for(let y=0;y<mapSize;y++)for(let x=0;x<mapSize;x++){let d=document.createElement('div');d.id=`cell-${x}-${y}`;d.className='cell cell-unknown';a.appendChild(d);}}
function updatePlayerVision(){[{x:0,y:0},{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}].forEach(o=>{let tx=playerPos.x+o.x,ty=playerPos.y+o.y;if(tx>=0&&tx<mapSize&&ty>=0&&ty<mapSize)visitedMaps[playerPos.floor][ty][tx]=true;});}
function renderMap(){const ar=["▲","▶","▼","◀"];const vis=visitedMaps[playerPos.floor];for(let y=0;y<mapSize;y++)for(let x=0;x<mapSize;x++){const c=document.getElementById(`cell-${x}-${y}`);c.innerText="";if(x===playerPos.x&&y===playerPos.y){c.className='cell cell-hero';c.innerText=ar[playerPos.dir];continue;}if(!vis[y][x]){c.className='cell cell-unknown';continue;}const v=currentMapData[y][x];if(v===1)c.className='cell cell-wall';else if(v===2)c.className='cell cell-stairs';else if(v===3)c.className='cell cell-boss';else if(v===4)c.className='cell cell-event';else if(v===5)c.className='cell cell-chest';else if(v===9)c.className='cell cell-entrance';else c.className='cell cell-floor';}}
function log(m){const l=document.getElementById('log');l.innerHTML+=`<p>> ${m}</p>`;l.scrollTop=l.scrollHeight;}