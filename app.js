(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
document.documentElement.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

/* ===== CONFIG (editar aqui) ===== */
const NUM={fortaleza:'5585986768008',sobral:'5585982257333',mossoro:'5584996729981',cariri:'5585986768008',indef:'5585986768008',equipe:'5585986768008'};
// Cariri: o número (88) 9986-2500 do site precisa de confirmação; até lá, a mensagem vai para o WhatsApp da sede.
const UNI=[{id:'fortaleza',label:'Fortaleza (sede)',nome:'Fortaleza'},{id:'sobral',label:'Sobral',nome:'Sobral'},{id:'cariri',label:'Juazeiro do Norte (Cariri)',nome:'Juazeiro do Norte (Cariri)'},{id:'mossoro',label:'Mossoró (RN)',nome:'Mossoró'},{id:'indef',label:'Ainda não sei',nome:''}];
const MOM=[
 {id:'m1',label:'Estou começando a pensar em engravidar',q:'O que é bom entender sobre fertilidade antes de começar a tentar?',t:'Anote há quanto tempo você pensa nisso e as dúvidas que surgirem. Não precisa ter nada decidido.'},
 {id:'m2',label:'Estou tentando há algum tempo',q:'Quais informações da minha rotina e do meu ciclo ajudam na conversa?',t:'Se tiver, leve exames e receitas anteriores. Se não tiver, tudo bem: a equipe orienta o que fizer sentido.'},
 {id:'m3',label:'Já fiz exames ou tratamentos e quero conversar',q:'Como posso trazer o meu histórico anterior para a consulta?',t:'Reúna laudos e receitas em uma pasta ou em fotos no celular. Ajuda, mas não é obrigatório.'},
 {id:'m4',label:'Quero conversar sobre preservar a minha fertilidade',q:'Como é a conversa sobre preservar a fertilidade, sem pressa?',t:'Pense no seu planejamento e nas suas dúvidas. A decisão é sua e é tomada com calma.'},
 {id:'m5',label:'Somos um casal homoafetivo ou quero uma gravidez independente',q:'Quais caminhos a clínica conversa em casos como o meu?',t:'Conte como você imagina a sua família. A equipe começa ouvindo a sua história.'},
 {id:'m6',label:'Sou pessoa trans e quero entender minhas opções',q:'Quais conversas existem sobre fertilidade e preservação na minha situação?',t:'Informe à equipe o nome e o tratamento que você prefere. Você pode chegar com perguntas, sem nada decidido.'},
 {id:'m7',label:'Quero só entender como tudo funciona',q:'Como é um primeiro atendimento na clínica?',t:'Está tudo bem chegar só com perguntas. A primeira consulta é uma conversa.'}
];
const TOP=[
 {id:'t1',label:'Entender meu ciclo e a ovulação',q:'O que a equipe observa para entender o meu ciclo e a ovulação?'},
 {id:'t2',label:'Exames de fertilidade',q:'Quais exames costumam ser conversados numa primeira avaliação, e por quê?'},
 {id:'t3',label:'Fertilização in vitro',q:'O que é a fertilização in vitro e em que situações ela costuma ser discutida?'},
 {id:'t4',label:'Inseminação artificial',q:'Como funciona a inseminação artificial?'},
 {id:'t5',label:'Congelamento de óvulos, embriões ou sêmen',q:'Como funcionam o congelamento e o armazenamento?'},
 {id:'t6',label:'Fertilidade masculina',q:'O que é avaliado na fertilidade masculina?'},
 {id:'t7',label:'Endometriose',q:'Como a endometriose é investigada e o que ela tem a ver com a fertilidade?'},
 {id:'t8',label:'Doação de óvulos',q:'Como funciona a doação de gametas no Brasil?'},
 {id:'t9',label:'Apoio psicológico',q:'Como funciona o apoio da psicologia durante esse processo?'},
 {id:'t10',label:'Nutrição',q:'Como a nutrição acompanha quem está nessa jornada?'},
 {id:'t11',label:'Gravidez independente ou casal homoafetivo',q:'Quais são as etapas para uma gravidez independente ou em casal homoafetivo?'},
 {id:'t12',label:'Medicações e tratamentos que já fiz',q:'Como organizo o que já usei e fiz para mostrar à equipe?'}
];
const BASE_Q='O que posso levar de histórico (exames, ciclos, medicações) para a primeira conversa?';
const FILL_Q=['Que dúvidas minhas a equipe pode esclarecer logo no primeiro encontro?','Como funciona o acompanhamento depois da primeira consulta?'];
const MSG={agendar:'Olá, vim pelo Instagram e gostaria de agendar uma consulta na Fertibaby.',equipe:'Olá, vim pelo Instagram e gostaria de mais informações.'};
const SAY={inicio:'Bem-vinda. Respire: a gente começa devagar.',consulta:'Sem pressa. Escolha o que faz sentido pra você.',jornada:'Tudo começa bem pequeno. Arraste e veja.',cuidados:'Toque num cuidado para entender o que é.',equipe:'Rostos de quem vai te receber.',unidades:'Fortaleza, Sobral, Cariri e Mossoró.',duvidas:'Pergunte à vontade. Aqui ninguém tem pressa.',contato:'Quando quiser, a gente conversa.'};

/* ===== TRACKING (placeholders) ===== */
window.dataLayer=window.dataLayer||[];
function track(ev,p){try{window.dataLayer.push(Object.assign({event:ev},p||{}));if(window.fbq)window.fbq('trackCustom',ev,p||{});if(window.gtag)window.gtag('event',ev,p||{});}catch(e){}}
window.fbTrack=track;
const wa=(n,m)=>'https://wa.me/'+n+'?text='+encodeURIComponent(m);

/* ===== BOTÕES, FUNDOS, PALAVRAS ===== */
function decorate(){
  $$('.btn').forEach(b=>{
    if(!b.querySelector('.sh'))b.insertAdjacentHTML('beforeend','<span class="sh"></span>');
    if(b.classList.contains('primary')&&!b.querySelector('.wv'))b.insertAdjacentHTML('beforeend','<span class="wv"></span><span class="wv"></span>');
    const lb=b.querySelector('.lb');if(lb){const L=lb.textContent.length,base=b.classList.contains('big')?19:b.classList.contains('small')?14.5:16;
      b.style.fontSize=Math.max(13.5,base-Math.min(3,Math.floor(Math.max(0,L-(b.classList.contains('big')?16:20))/7)))+'px';}
  });
  const pos=[[ '-40px','8%',150],['60%','30%',190],['-50px','55%',130],['62%','72%',170],['10%','18%',140],['58%','6%',160],['-30px','40%',180],['50%','50%',150]];
  $$('.sec').forEach((s,i)=>{
    const bg=document.createElement('div');bg.className='bg';
    bg.innerHTML='<div class="cn"></div><i class="bb b1"></i><i class="bb b2"></i><i class="bb b3"></i><i class="bb b4"></i><div class="dt"></div><svg class="gr"><use href="#logo-icon"/></svg>';
    const g=bg.querySelector('.gr'),p=pos[i%pos.length];g.style.left=p[0];g.style.top=p[1];g.style.width=g.style.height=p[2]+'px';
    s.prepend(bg);
  });
  $$('.words').forEach(el=>{let n=0;const walk=node=>{[...node.childNodes].forEach(c=>{
    if(c.nodeType===3){const parts=c.textContent.split(/(\s+)/);const f=document.createDocumentFragment();
      parts.forEach(pt=>{if(!pt)return;if(/^\s+$/.test(pt)){f.appendChild(document.createTextNode(' '));}else{const w=document.createElement('span');w.className='w';w.style.setProperty('--i',n++);w.textContent=pt;f.appendChild(w);}});c.replaceWith(f);}
    else if(c.nodeType===1)walk(c);});};walk(el);});
  $$('[data-wa]').forEach(a=>{a.target='_blank';a.rel='noopener';const k=a.dataset.wa;
    if(k==='agendar')a.href=wa(NUM.fortaleza,MSG.agendar);
    else if(k==='equipe')a.href=wa(NUM.equipe,MSG.equipe);
    else if(k==='tema'){const n=a.closest('.card').dataset.n;a.href=wa(NUM.fortaleza,'Olá! Vim pelo biolink da Fertibaby e gostaria de conversar sobre '+n+' em uma consulta.');}
    else if(k==='unit'){const u=a.dataset.unit,nm=UNI.find(x=>x.id===u).nome;a.href=wa(NUM[u],'Olá! Vim pelo biolink da Fertibaby e gostaria de falar com a unidade de '+nm+'.');a.dataset.ev='whatsapp_'+u;}
  });
  document.addEventListener('click',e=>{const a=e.target.closest('[data-ev]');if(a)track(a.dataset.ev,a.dataset.unit?{unidade:a.dataset.unit}:{});},true);
  document.addEventListener('pointerdown',e=>{if(RM)return;const t=document.createElement('i');t.className='tr';t.style.left=e.clientX+'px';t.style.top=e.clientY+'px';t.style.transform='translate(-50%,-50%)';document.body.appendChild(t);setTimeout(()=>t.remove(),720);},{passive:true});
}

/* ===== EMBRIÃO (motor compartilhado) ===== */
function polar(n,r,off){const a=[];for(let i=0;i<n;i++){const t=(off+i*360/n)*Math.PI/180;a.push([+(Math.cos(t)*r).toFixed(1),+(Math.sin(t)*r).toFixed(1)]);}return a;}
const icm=[[-36,-30],[-12,-40],[-52,-6],[-26,-8],[-8,-18]];
const STG={
  hide:{l:[[0,0]],r:0,op:0},
  zyg:{l:[[0,0]],r:72,op:1},
  c2:{l:[[-42,0],[42,0]],r:46,op:1},
  c4:{l:polar(4,56,45),r:40,op:1},
  c8:{l:polar(8,66,0),r:30,op:1},
  mor:{l:[...polar(10,84,0),...polar(5,46,18),[0,0]],r:25,op:1},
  blas:{l:[...polar(18,100,0),...icm],r:17,op:1}
};
function Embryo(g){
  const N=23,cells=[];
  const cav=document.createElementNS(NS,'circle');cav.setAttribute('r',82);cav.setAttribute('class','cav');cav.style.transform='scale(.2)';cav.style.opacity=0;g.appendChild(cav);
  for(let i=0;i<N;i++){const c=document.createElementNS(NS,'circle');c.setAttribute('r',40);c.setAttribute('class','cell');c.style.transform='translate(0px,0px) scale(0)';c.style.opacity=0;g.appendChild(c);cells.push(c);}
  const nu=[0,1].map(i=>{const c=document.createElementNS(NS,'circle');c.setAttribute('r',13);c.setAttribute('class','nuc');c.style.transform='translate('+(i?18:-18)+'px,0px) scale(0)';g.appendChild(c);return c;});
  const gam=[0,1].map(i=>{const c=document.createElementNS(NS,'circle');c.setAttribute('r',40);c.setAttribute('class','cell');c.style.transform='translate('+(i?96:-96)+'px,0px) scale(0)';c.style.opacity=0;g.appendChild(c);return c;});
  let cur='hide';
  function stage(name){
    cur=name;
    if(name==='gam'){cells.forEach(c=>{c.style.opacity=0;c.style.transform='translate(0px,0px) scale(0)'});gam.forEach((c,i)=>{c.style.opacity=1;c.style.transform='translate('+(i?33:-33)+'px,0px) scale(.65)'});nu.forEach(n=>n.style.opacity=0);cav.style.opacity=0;return;}
    gam.forEach((c,i)=>{c.style.opacity=0;c.style.transform='translate('+(i?0:0)+'px,0px) scale(0)'});
    const S=STG[name];
    cells.forEach((c,i)=>{const p=S.l[i%S.l.length];const isIcm=name==='blas'&&i>=18;c.style.transform='translate('+p[0]+'px,'+p[1]+'px) scale('+(S.r/40)+')';c.style.opacity=S.op;});
    cav.style.transform='scale('+(name==='blas'?1:.2)+')';cav.style.opacity=name==='blas'?1:0;
    nu.forEach((n,i)=>{n.style.opacity=name==='zyg'?.85:0;n.style.transform='translate('+(i?18:-18)+'px,0px) scale('+(name==='zyg'?1:0)+')';});
  }
  return{stage,get cur(){return cur}};
}

/* ===== ABERTURA ===== */
const ab=$('#abertura');
let entered=false;
function enter(){
  if(entered)return;entered=true;
  ab.classList.add('out');document.body.classList.remove('lock');document.body.classList.add('ready');
  track('abertura_concluida');
  setTimeout(()=>{ab.remove();mascotStart();},1100);
  onScroll();
}
function opening(){
  document.body.classList.add('lock');
  const emb=Embryo($('#abEmbryo'));
  const sph=$('#abSpheres'),petG=$('#abPetals'),logo=$('#abLogo'),word=$('#abWord'),txt=$('#abText'),K=$('#abK'),H=$('#abH'),hint=$('#abHint');
  const pistil=document.createElementNS(NS,'circle');pistil.setAttribute('r',58);pistil.setAttribute('fill','url(#gGlow)');pistil.style.cssText='opacity:0;transition:opacity 1s .4s';
  const pets=[];
  for(let i=0;i<8;i++){const e=document.createElementNS(NS,'ellipse');e.setAttribute('rx',25);e.setAttribute('ry',52);e.setAttribute('class','petal');e.style.opacity=0;e.style.transform='rotate('+(i*45)+'deg) translateY(0px) scale(.2)';petG.appendChild(e);pets.push(e);}
  petG.appendChild(pistil);
  $('#abLogo').style.color='#4C3261';
  const setT=(k,h,hn)=>{txt.classList.remove('sw');void txt.offsetWidth;K.innerHTML='<span class="t-it">'+k+'</span>';H.textContent=h;txt.classList.add('sw');if(hn!==undefined)hint.textContent=hn;};
  let st=0,timer;
  async function tap1(){
    st=1;clearTimeout(timer);hint.textContent='';
    sph.classList.add('merge');await sleep(1000);sph.classList.add('gone');
    emb.stage('zyg');setT('o encontro','dia 0','toque para dividir');
    timer=setTimeout(tap2,6500);
  }
  async function tap2(){
    if(st!==1)return;st=2;clearTimeout(timer);hint.textContent='';
    setT('as primeiras divisões','dia 2');emb.stage('c2');await sleep(800);emb.stage('c4');await sleep(900);
    setT('cerca de oito células','dia 3');emb.stage('c8');await sleep(1100);
    setT('as células se agrupam','dia 4');emb.stage('mor');await sleep(1100);
    setT('o blastocisto','dia 5');emb.stage('blas');await sleep(1200);
    txt.style.opacity=0;emb.stage('hide');
    pets.forEach((e,i)=>{e.style.opacity=.95;e.style.transform='rotate('+(i*45+22)+'deg) translateY(-66px) scale(1)';});
    pistil.style.opacity=1;await sleep(900);logo.classList.add('on');word.classList.add('on');
    st=3;await sleep(3000);enter();
  }
  ab.addEventListener('pointerdown',e=>{if(e.target.closest('.skip'))return;if(st===0)tap1();else if(st===1)tap2();});
  $('#skip').addEventListener('click',e=>{e.stopPropagation();enter();});
  timer=setTimeout(()=>{if(st===0)tap1();},7000);
  setTimeout(()=>{if(!entered&&st<2)hint.style.opacity=1;},100);
}

/* ===== FERRAMENTA ===== */
function tool(){
  const chMom=$('#chMom'),chTop=$('#chTop'),chUni=$('#chUni');
  const ck='<span class="ck"><svg><use href="#i-check"/></svg></span>';
  const mk=(host,arr,cls)=>arr.forEach(o=>{const b=document.createElement('button');b.type='button';b.className='chip';b.dataset.id=o.id;b.innerHTML=ck+'<span>'+o.label+'</span>';host.appendChild(b);});
  mk(chMom,MOM);mk(chTop,TOP);mk(chUni,UNI);
  const S={mom:null,top:[],uni:null,step:0,started:false};
  const screens=$$('.screen',$('#screens')),stp=$$('#stp i'),lab=$('#stLab'),back=$('#tBack'),next=$('#tNext');
  const start=()=>{if(!S.started){S.started=true;track('roteiro_iniciado');}};
  chMom.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;start();$$('.chip',chMom).forEach(c=>c.classList.toggle('on',c===b));S.mom=b.dataset.id;upd();});
  chTop.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;start();b.classList.toggle('on');const id=b.dataset.id;S.top=S.top.includes(id)?S.top.filter(x=>x!==id):[...S.top,id];upd();});
  chUni.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;start();$$('.chip',chUni).forEach(c=>c.classList.toggle('on',c===b));S.uni=b.dataset.id;upd();});
  function upd(){
    screens.forEach((s,i)=>s.classList.toggle('on',i===S.step));
    stp.forEach((s,i)=>s.classList.toggle('on',i<=Math.min(S.step,2)));
    lab.textContent=S.step<3?(S.step+1)+' de 3':'Pronto';
    back.disabled=S.step===0;
    next.querySelector('.lb').textContent=S.step===2?'Ver meu roteiro':'Continuar';
    next.disabled=(S.step===0&&!S.mom)||(S.step===2&&!S.uni);
    $('#toolNav').style.display=S.step===3?'none':'';
  }
  function build(){
    const mom=MOM.find(m=>m.id===S.mom),tops=S.top.map(id=>TOP.find(t=>t.id===id)),uni=UNI.find(u=>u.id===S.uni);
    const qs=[BASE_Q,mom.q,...tops.slice(0,3).map(t=>t.q),uni.nome?'Como funciona o atendimento na unidade de '+uni.nome+'?':'Qual unidade fica mais conveniente para o meu caso?'];
    let f=0;while(qs.length<4)qs.push(FILL_Q[f++]);
    const rot=$('#rot');rot.innerHTML='';qs.slice(0,6).forEach((q,i)=>{const li=document.createElement('li');li.textContent=q;li.style.animationDelay=(i*110)+'ms';rot.appendChild(li);});
    $('#stepCard').innerHTML='<b>Seu próximo passo</b>'+mom.t;
    let m='Olá! Vim pelo biolink da Fertibaby e gostaria de agendar uma consulta.';
    if(tops.length)m+=' Quero conversar sobre: '+tops.map(t=>t.label).join(', ')+'.';
    if(uni.nome)m+=' Unidade: '+uni.nome+'.';
    const a=$('#toolWa');a.href=wa(NUM[uni.id],m);a.target='_blank';a.rel='noopener';a.dataset.unit=uni.id;
    window.__roteiro={qs:qs.slice(0,6),msg:m,num:NUM[uni.id]};
    track('roteiro_concluido',{unidade:uni.id});
  }
  next.addEventListener('click',()=>{if(S.step===2){S.step=3;build();}else S.step++;upd();});
  back.addEventListener('click',()=>{if(S.step>0){S.step--;upd();}});
  $('#redo').addEventListener('click',()=>{S.mom=null;S.top=[];S.uni=null;S.step=0;S.started=false;$$('.chip',$('#tool')).forEach(c=>c.classList.remove('on'));upd();});
  $('#toolWa').addEventListener('click',()=>track('agendar_click',{unidade:S.uni}));
  window.__tool={S,upd,build,next,MOM,TOP,UNI};
  upd();
}

/* ===== JORNADA: EMBRIÃO ===== */
function journey(){
  const emb=Embryo($('#embG')),R=$('#dayR'),N=$('#dayN'),T=$('#dayT'),D=$('#dayD'),P=$$('#dayP button');
  const DAYS=[
    ['O encontro','Óvulo e espermatozoide se encontram em laboratório: é a fecundação.','gam'],
    ['Uma célula só','Forma-se o zigoto, uma única célula com o material genético dos dois.','zyg'],
    ['As primeiras divisões','A célula se divide em duas, depois em quatro. O embrião ainda é muito pequeno.','c4'],
    ['Cerca de oito células','As divisões continuam e a equipe de embriologia acompanha cada passo.','c8'],
    ['A mórula','As células se agrupam e formam uma bolinha compacta, chamada mórula.','mor'],
    ['O blastocisto','Surge uma cavidade com líquido e as células se organizam. É uma das etapas que o laboratório acompanha.','blas']
  ];
  let cur=-1,touched=false;
  function set(d,fromUser){
    if(fromUser)touched=true;
    R.style.setProperty('--p',(d/5*100)+'%');
    if(d===cur)return;cur=d;
    emb.stage(DAYS[d][2]);
    N.textContent=d;T.textContent=DAYS[d][0];D.textContent=DAYS[d][1];
    [T,D,N].forEach(el=>{el.style.animation='none';void el.offsetWidth;el.style.animation='balin .5s var(--ease) both';});
    P.forEach(b=>b.classList.toggle('on',+b.dataset.d===d));
  }
  R.addEventListener('input',()=>{set(Math.round(+R.value),true);});
  R.addEventListener('change',()=>{R.value=cur;});
  P.forEach(b=>b.addEventListener('click',()=>{R.value=b.dataset.d;set(+b.dataset.d,true);}));
  set(0);
  let played=false;
  new IntersectionObserver(async(en,o)=>{if(en[0].isIntersecting&&!played){played=true;if(RM)return;for(let d=1;d<=5&&!touched;d++){await sleep(1100);if(touched)break;R.value=d;set(d);}}},{threshold:.5}).observe($('.emb'));
  // timeline
  const tl=$('#tl'),lis=$$('li',tl);
  window.__tlUpdate=()=>{const r=tl.getBoundingClientRect(),vh=innerHeight,y=vh*.6;
    const p=Math.max(0,Math.min(1,(y-r.top)/r.height));tl.style.setProperty('--p',p);
    lis.forEach(li=>li.classList.toggle('lit',li.getBoundingClientRect().top<y));};
}

/* ===== CUIDADOS ===== */
function care(){
  const acc=$('#acc'),cards=$$('.card',acc);
  acc.addEventListener('click',e=>{const h=e.target.closest('.c-h');if(!h)return;const c=h.parentElement,open=!c.classList.contains('open');
    cards.forEach(x=>{x.classList.remove('open');x.querySelector('.c-h').setAttribute('aria-expanded','false');});
    if(open){c.classList.add('open');h.setAttribute('aria-expanded','true');}});
  $('#tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#tabs button').forEach(x=>x.classList.toggle('on',x===b));
    cards.forEach(c=>c.classList.remove('open'));let i=0;
    cards.forEach(c=>{const show=c.dataset.k===b.dataset.k;c.hidden=!show;c.classList.remove('fi');if(show){c.style.animationDelay=(i++*70)+'ms';void c.offsetWidth;c.classList.add('fi');}});});
}

/* ===== EQUIPE / AVALIAÇÕES / TIRAS ===== */
function team(){
  const deck=$('#deck'),cs=$$('.p-card',deck),dots=$('#deckDots');
  cs.forEach((c,i)=>{const d=document.createElement('i');dots.appendChild(d);d.addEventListener('click',()=>deck.scrollTo({left:c.offsetLeft-(deck.clientWidth-c.offsetWidth)/2,behavior:'smooth'}));});
  const dd=$$('i',dots);
  const act=()=>{const mid=deck.scrollLeft+deck.clientWidth/2;let best=0,bd=1e9;cs.forEach((c,i)=>{const d=Math.abs(c.offsetLeft+c.offsetWidth/2-mid);if(d<bd){bd=d;best=i;}});cs.forEach((c,i)=>c.classList.toggle('act',i===best));dd.forEach((d,i)=>d.classList.toggle('on',i===best));};
  deck.addEventListener('scroll',()=>requestAnimationFrame(act),{passive:true});act();
  // arrastar com mouse
  let down=false,sx=0,sl=0;
  deck.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;sx=e.clientX;sl=deck.scrollLeft;deck.style.scrollSnapType='none';});
  addEventListener('pointerup',()=>{if(down){down=false;deck.style.scrollSnapType='';}});
  addEventListener('pointermove',e=>{if(down)deck.scrollLeft=sl-(e.clientX-sx);});
  // avaliações
  const tr=$('#revTrack'),qs=$$('.q-c',tr),rd=$('#revDots');
  qs.forEach((q,i)=>{const d=document.createElement('i');rd.appendChild(d);d.addEventListener('click',()=>{go(i);hold=Date.now()+9000;});});
  const rdd=$$('i',rd);let idx=0,hold=0;const T=5200;
  function mark(i){idx=i;rdd.forEach((d,k)=>{d.classList.toggle('on',k===i);if(k===i){d.style.setProperty('--rt',T+'ms');d.classList.remove('on');void d.offsetWidth;d.classList.add('on');}});}
  function go(i){tr.scrollTo({left:qs[i].offsetLeft-(tr.clientWidth-qs[i].offsetWidth)/2,behavior:'smooth'});mark(i);}
  tr.addEventListener('scroll',()=>{const mid=tr.scrollLeft+tr.clientWidth/2;let b=0,bd=1e9;qs.forEach((q,i)=>{const d=Math.abs(q.offsetLeft+q.offsetWidth/2-mid);if(d<bd){bd=d;b=i;}});if(b!==idx&&Date.now()>hold-8000+500){mark(b);}hold=Date.now()+9000;},{passive:true});
  mark(0);
  setInterval(()=>{if(document.hidden||RM||Date.now()<hold)return;const r=tr.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;go((idx+1)%qs.length);},T);
  // contadores
  const cnt=(el,to,dec)=>{const t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-k,3);el.textContent=(to*e).toFixed(dec).replace('.',',');if(k<1)requestAnimationFrame(f);};requestAnimationFrame(f);};
  new IntersectionObserver((en,o)=>{if(en[0].isIntersecting){o.disconnect();if(!RM){cnt($('#rateN'),4.4,1);cnt($('#rateC'),106,0);}}},{threshold:.6}).observe($('.rate'));
}

/* ===== UNIDADES ===== */
function units(){
  const us=$$('.unit'),pins=$$('.pin');let i=0,fixed=null;
  const set=id=>{us.forEach(u=>u.classList.toggle('on',u.dataset.u===id));pins.forEach(p=>p.classList.toggle('on',p.dataset.u===id));};
  set('fortaleza');
  setInterval(()=>{if(fixed||document.hidden)return;const r=$('#units').getBoundingClientRect();if(r.bottom<-200||r.top>innerHeight+400)return;i=(i+1)%us.length;set(us[i].dataset.u);},3200);
  const pick=id=>{if(fixed===id){fixed=null;return;}fixed=id;set(id);};
  us.forEach(u=>u.addEventListener('click',e=>{if(e.target.closest('a'))return;pick(u.dataset.u);}));
  pins.forEach(p=>p.addEventListener('click',()=>pick(p.dataset.u)));
}

/* ===== DÚVIDAS (CHAT) ===== */
function faq(){
  const thread=$('#thread'),asks=$('#asks'),arts=$$('#faqSeo article');
  const QA=arts.map(a=>({q:a.querySelector('h3').textContent,a:a.querySelector('p').textContent}));
  let busy=false,first=false;
  const av='<div class="av"><svg><use href="#logo-icon"/></svg></div>';
  QA.forEach((x,i)=>{const b=document.createElement('button');b.type='button';b.className='ask';b.textContent=x.q;b.dataset.i=i;asks.appendChild(b);});
  async function ask(i){
    if(busy)return;busy=true;const b=asks.children[i];b.classList.add('used');
    const me=document.createElement('div');me.className='msg me';me.innerHTML='<div class="bub"></div>';me.firstChild.textContent=QA[i].q;thread.appendChild(me);
    await sleep(RM?0:300);
    const bot=document.createElement('div');bot.className='msg bot';bot.innerHTML=av+'<div class="bub"><div class="dots"><i></i><i></i><i></i></div></div>';thread.appendChild(bot);
    await sleep(RM?0:850);
    const bub=bot.querySelector('.bub'),txt=QA[i].a;
    if(RM){bub.textContent=txt;}
    else{bub.innerHTML='<span class="t"></span><span class="caret"></span>';const t=bub.querySelector('.t');for(let k=1;k<=txt.length;k++){t.textContent=txt.slice(0,k);await sleep(16);}bub.querySelector('.caret').remove();}
    busy=false;
  }
  asks.addEventListener('click',e=>{const b=e.target.closest('.ask');if(b)ask(+b.dataset.i);});
  new IntersectionObserver((en,o)=>{if(en[0].isIntersecting&&!first){first=true;o.disconnect();setTimeout(()=>ask(0),500);}},{threshold:.35}).observe($('#chat'));
}

/* ===== SCROLL: MENU, TEMA, REVELAR ===== */
const secs=$$('.sec');let lastSec='inicio';
function onScroll(){
  const vh=innerHeight,y=vh*.42;let cur=secs[0];
  secs.forEach(s=>{const r=s.getBoundingClientRect();if(r.top<=y)cur=s;});
  if(cur.id!==lastSec){lastSec=cur.id;}
  document.body.dataset.theme=cur.dataset.theme;
  document.documentElement.style.setProperty('--mc',cur.dataset.theme==='light'?'#4C3261':cur.dataset.theme==='mid'?'#2E1B3E':'#D1B4F6');
  $$('#menu a').forEach(a=>a.classList.toggle('on',a.dataset.t===cur.id));
  const h=document.documentElement.scrollHeight-vh;$('#mProg').style.width=(h>0?scrollY/h*100:0)+'%';
  if(window.__tlUpdate)window.__tlUpdate();
  $$('[data-par]').forEach(im=>{const r=im.parentElement.getBoundingClientRect();if(r.bottom<-50||r.top>vh+50)return;const c=r.top+r.height/2-vh/2;im.style.transform='translateY('+(Math.max(-24,Math.min(24,c*-parseFloat(im.dataset.par)*1.2)))+'px)';});
}
let tick=false;addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(()=>{tick=false;onScroll();});}},{passive:true});
addEventListener('resize',onScroll);
function reveal(){
  const io=new IntersectionObserver((en)=>en.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  $$('[data-in]').forEach(el=>io.observe(el));
  setTimeout(()=>$$('[data-in]:not(.in)').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('in');}),3000);
}

/* ===== MASCOTE ===== */
let mascotOn=false;
function mascotStart(){
  if(mascotOn)return;mascotOn=true;
  const M=$('#mascot'),B=$('#mBal');M.style.opacity=1;
  if(RM){M.style.transform='translate('+(innerWidth-60)+'px,'+(innerHeight-70)+'px)';return;}
  const steps=[{lane:'b',side:'l'},{lane:'t',side:'r'},{lane:'b',side:'r'},{lane:'t',side:'l'}];let k=0;
  async function run(){
    for(;;){
      if(document.hidden){await sleep(800);continue;}
      const s=steps[k++%steps.length],col=$('#app').getBoundingClientRect(),W=innerWidth,H=innerHeight;
      const L=Math.max(0,col.left),Rr=Math.min(W,col.right);
      const y=s.lane==='b'?H-46-16:80;
      const xIn=s.side==='l'?L+10:Rr-46-10,xOut=s.side==='l'?L-70:Rr+30;
      B.className='bal';B.style.cssText='';
      if(s.side==='l')B.style.left='0';else B.style.right='0';
      if(s.lane==='b')B.style.bottom='54px';else B.style.top='54px';
      B.textContent=SAY[lastSec]||'';
      const a1=M.animate([{transform:'translate('+xOut+'px,'+y+'px) rotate('+(s.side==='l'?-320:320)+'deg)'},{transform:'translate('+xIn+'px,'+y+'px) rotate(0deg)'}],{duration:1100,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
      await a1.finished;await sleep(250);B.textContent=SAY[lastSec]||'';B.classList.add('show');await sleep(3800);B.classList.remove('show');B.style.opacity=0;await sleep(200);
      const a2=M.animate([{transform:'translate('+xIn+'px,'+y+'px) rotate(0deg)'},{transform:'translate('+xOut+'px,'+y+'px) rotate('+(s.side==='l'?-320:320)+'deg)'}],{duration:1000,easing:'cubic-bezier(.6,0,.8,.4)',fill:'forwards'});
      await a2.finished;await sleep(4500);
    }
  }
  run();
}

/* ===== INIT ===== */
decorate();tool();journey();care();team();units();faq();reveal();
const DESK=matchMedia('(hover:hover) and (pointer:fine)').matches;
if(RM||DESK){$('#abertura').remove();document.body.classList.add('ready');entered=true;mascotStart();}
else opening();
onScroll();
})();
