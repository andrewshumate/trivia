var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function s(e){e.forEach(t)}function a(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let i,o;function c(e,t){return i||(i=document.createElement("a")),i.href=t,e===i.href}function l(e,t,n,s){if(e){const a=u(e,t,n,s);return e[0](a)}}function u(e,t,n,s){return e[1]&&s?function(e,t){for(const n in t)e[n]=t[n];return e}(n.ctx.slice(),e[1](s(t))):n.ctx}function m(e,t,n,s){if(e[2]&&s){const a=e[2](s(n));if(void 0===t.dirty)return a;if("object"==typeof a){const e=[],n=Math.max(t.dirty.length,a.length);for(let s=0;s<n;s+=1)e[s]=t.dirty[s]|a[s];return e}return t.dirty|a}return t.dirty}function d(e,t,n,s,a,r){if(a){const i=u(t,n,s,r);e.p(i,a)}}function N(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let e=0;e<n;e++)t[e]=-1;return t}return-1}function A(e,t){e.appendChild(t)}function S(e,t,n){e.insertBefore(t,n||null)}function g(e){e.parentNode.removeChild(e)}function f(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function p(e){return document.createElement(e)}function h(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function _(e){return document.createTextNode(e)}function E(){return _(" ")}function L(){return _("")}function C(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function y(e){return function(t){return t.preventDefault(),e.call(this,t)}}function O(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function T(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function I(e,t,n){e.classList[n?"add":"remove"](t)}function R(e){o=e}function $(){const e=function(){if(!o)throw new Error("Function called outside component initialization");return o}();return(t,n)=>{const s=e.$$.callbacks[t];if(s){const a=function(e,t,n=!1){const s=document.createEvent("CustomEvent");return s.initCustomEvent(e,n,!1,t),s}(t,n);s.slice().forEach((t=>{t.call(e,a)}))}}}function v(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach((e=>e.call(this,t)))}const G=[],w=[],M=[],F=[],B=Promise.resolve();let H=!1;function b(e){M.push(e)}let k=!1;const x=new Set;function K(){if(!k){k=!0;do{for(let e=0;e<G.length;e+=1){const t=G[e];R(t),D(t.$$)}for(R(null),G.length=0;w.length;)w.pop()();for(let e=0;e<M.length;e+=1){const t=M[e];x.has(t)||(x.add(t),t())}M.length=0}while(G.length);for(;F.length;)F.pop()();H=!1,k=!1,x.clear()}}function D(e){if(null!==e.fragment){e.update(),s(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(b)}}const P=new Set;let q;function W(){q={r:0,c:[],p:q}}function Q(){q.r||s(q.c),q=q.p}function Y(e,t){e&&e.i&&(P.delete(e),e.i(t))}function V(e,t,n,s){if(e&&e.o){if(P.has(e))return;P.add(e),q.c.push((()=>{P.delete(e),s&&(n&&e.d(1),s())})),e.o(t)}}function J(e){e&&e.c()}function U(e,n,r,i){const{fragment:o,on_mount:c,on_destroy:l,after_update:u}=e.$$;o&&o.m(n,r),i||b((()=>{const n=c.map(t).filter(a);l?l.push(...n):s(n),e.$$.on_mount=[]})),u.forEach(b)}function z(e,t){const n=e.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function j(e,t){-1===e.$$.dirty[0]&&(G.push(e),H||(H=!0,B.then(K)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function X(t,a,r,i,c,l,u,m=[-1]){const d=o;R(t);const N=t.$$={fragment:null,ctx:null,props:l,update:e,not_equal:c,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a.context||(d?d.$$.context:[])),callbacks:n(),dirty:m,skip_bound:!1,root:a.target||d.$$.root};u&&u(N.root);let A=!1;if(N.ctx=r?r(t,a.props||{},((e,n,...s)=>{const a=s.length?s[0]:n;return N.ctx&&c(N.ctx[e],N.ctx[e]=a)&&(!N.skip_bound&&N.bound[e]&&N.bound[e](a),A&&j(t,e)),n})):[],N.update(),A=!0,s(N.before_update),N.fragment=!!i&&i(N.ctx),a.target){if(a.hydrate){const e=function(e){return Array.from(e.childNodes)}(a.target);N.fragment&&N.fragment.l(e),e.forEach(g)}else N.fragment&&N.fragment.c();a.intro&&Y(t.$$.fragment),U(t,a.target,a.anchor,a.customElement),K()}R(d)}class Z{$destroy(){z(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const ee=(e,t)=>te(ne(e),ne(t))>=.6,te=(e,t)=>e[0]!=t[0]?0:1-1*ae(e,t)/e.length,ne=e=>e.replace(/[^0-9a-zA-Z]/g,"").toLowerCase(),se=(e,t,n,s,a)=>e<t||n<t?e>n?n+1:e+1:s===a?t:t+1,ae=(e,t)=>{if(e===t)return 0;if(e.length>t.length){var n=e;e=t,t=n}for(var s=e.length,a=t.length;s>0&&e.charCodeAt(s-1)===t.charCodeAt(a-1);)s--,a--;for(var r=0;r<s&&e.charCodeAt(r)===t.charCodeAt(r);)r++;if(a-=r,0===(s-=r)||a<3)return a;var i,o,c,l,u,m,d,N,A,S,g,f=0,p=0,h=[];for(i=0;i<s;i++)h.push(i+1),h.push(e.charCodeAt(r+i));for(var _=h.length-1;f<a-3;)for(N=t.charCodeAt(r+(o=f)),A=t.charCodeAt(r+(c=f+1)),S=t.charCodeAt(r+(l=f+2)),g=t.charCodeAt(r+(u=f+3)),p=f+=4,i=0;i<_;i+=2)m=h[i],d=h[i+1],o=se(m,o,c,N,d),c=se(o,c,l,A,d),l=se(c,l,u,S,d),p=se(l,u,p,g,d),h[i]=p,u=l,l=c,c=o,o=m;for(;f<a;)for(N=t.charCodeAt(r+(o=f)),p=++f,i=0;i<_;i+=2)m=h[i],h[i]=p=se(m,o,p,N,h[i+1]),o=m;return p};var re;function ie(e){switch(e){case re.LAS_VEGAS_RAIDERS:return{stadiumNames:["Allegiant Stadium","Allegiant"],cityNames:["Paradise, Nevada"],teamNames:["Las Vegas Raiders","Raiders"]};case re.KANSAS_CITY_CHIEFS:return{stadiumNames:["Geha Field at Arrowhead Stadium","Geha Field","Arrowhead Stadium","Geha","Arrowhead"],cityNames:["Kansas City, Missouri"],teamNames:["Kansas City Chiefs","Chiefs"]};case re.DALLAS_COWBOYS:return{stadiumNames:["AT&T Stadium","AT&T"],cityNames:["Arlington, Texas"],teamNames:["Dallas Cowboys","Cowboys"]};case re.CAROLINA_PANTHERS:return{stadiumNames:["Bank of America Stadium","BOA stadium","BOA","Bank of America"],cityNames:["Charlotte, North Carolina"],teamNames:["Carolina Panthers","Panthers"]};case re.NEW_ORLEANS_SAINTS:return{stadiumNames:["Caesars Superdome","Superdome"],cityNames:["New Orleans, Louisiana"],teamNames:["New Orleans Saints","Saints"]};case re.DENVER_BRONCOS:return{stadiumNames:["Empower Field at Mile High","Mile High","New Mile High","Mile High Stadium"],cityNames:["Denver, Colorado"],teamNames:["Denver Broncos","Broncos"]};case re.WASHINGTON_FOOTBALL_TEAM:return{stadiumNames:["FedExField","FedEx"],cityNames:["Landover, Maryland"],teamNames:["Washington Football Team","Washington Football Team"]};case re.CLEVELAND_BROWNS:return{stadiumNames:["FirstEnergy Stadium","FirstEnergy"],cityNames:["Cleveland, Ohio"],teamNames:["Cleveland Browns","Browns"]};case re.DETROIT_LIONS:return{stadiumNames:["Ford Field","Ford"],cityNames:["Detroit, Michigan"],teamNames:["Detroit Lions","Lions"]};case re.NEW_ENGLAND_PATRIOTS:return{stadiumNames:["Gillette Stadium","Gillette"],cityNames:["Foxborough, Massachusetts"],teamNames:["New England Patriots","Patriots"]};case re.MIAMI_DOLPHINS:return{stadiumNames:["Hard Rock Stadium","Hard Rock"],cityNames:["Miami Gardens, Florida"],teamNames:["Miami Dolphins","Dolphins"]};case re.PITTSBURGH_STEELERS:return{stadiumNames:["Heinz Field","Heinz"],cityNames:["Pittsburgh, Pennsylvania"],teamNames:["Pittsburgh Steelers","Steelers"]};case re.BUFFALO_BILLS:return{stadiumNames:["Highmark Stadium","Highmark"],cityNames:["Orchard Park, New York"],teamNames:["Buffalo Bills","Bills"]};case re.GREEN_BAY_PACKERS:return{stadiumNames:["Lambeau Field","Lambeau"],cityNames:["Green Bay, Wisconsin"],teamNames:["Green Bay Packers","Packers"]};case re.SAN_FRANCISCO_49ERS:return{stadiumNames:["Levi's Stadium","Levi's"],cityNames:["Santa Clara, California"],teamNames:["San Francisco 49ers","49ers"]};case re.PHILADELPHIA_EAGLES:return{stadiumNames:["Lincoln Financial Field","Lincoln Financial","Lincoln"],cityNames:["Philadelphia, Pennsylvania"],teamNames:["Philadelphia Eagles","Eagles"]};case re.INDIANAPOLIS_COLTS:return{stadiumNames:["Lucas Oil Stadium","Lucas Oil"],cityNames:["Indianapolis, Indiana"],teamNames:["Indianapolis Colts","Colts"]};case re.SEATTLE_SEAHAWKS:return{stadiumNames:["Lumen Field","Lumen"],cityNames:["Seattle, Washington"],teamNames:["Seattle Seahawks","Seahawks"]};case re.BALTIMORE_RAVENS:return{stadiumNames:["M&T Bank Stadium","M&T Bank"],cityNames:["Baltimore, Maryland"],teamNames:["Baltimore Ravens","Ravens"]};case re.ATLANTA_FALCONS:return{stadiumNames:["Mercedes-Benz Stadium","Mercedes","Mercedes-Benz"],cityNames:["Atlanta, Georgia"],teamNames:["Atlanta Falcons","Falcons"]};case re.NEW_YORK_GIANTS:return{stadiumNames:["MetLife Stadium","MetLife"],cityNames:["East Rutherford, New Jersey"],teamNames:["New York Giants","Giants"]};case re.NEW_YORK_JETS:return{stadiumNames:["MetLife Stadium","MetLife"],cityNames:["East Rutherford, New Jersey"],teamNames:["New York Jets","Jets"]};case re.TENNESSEE_TITANS:return{stadiumNames:["Nissan Stadium","Nissan"],cityNames:["Nashville, Tennessee"],teamNames:["Tennessee Titans","Titans"]};case re.HOUSTON_TEXANS:return{stadiumNames:["NRG Stadium","NRG"],cityNames:["Houston, Texas"],teamNames:["Houston Texans","Texans"]};case re.CINCINNATI_BENGALS:return{stadiumNames:["Paul Brown Stadium","Paul Brown"],cityNames:["Cincinnati, Ohio"],teamNames:["Cincinnati Bengals","Bengals"]};case re.TAMPA_BAY_BUCCANEERS:return{stadiumNames:["Raymond James Stadium","Raymond James"],cityNames:["Tampa, Florida"],teamNames:["Tampa Bay Buccaneers","Buccaneers"]};case re.LOS_ANGELES_RAMS:return{stadiumNames:["SoFi Stadium","SoFi"],cityNames:["Inglewood, California"],teamNames:["Los Angeles Rams","Rams"]};case re.LOS_ANGELES_CHARGERS:return{stadiumNames:["SoFi Stadium","SoFi"],cityNames:["Inglewood, California"],teamNames:["Los Angeles Chargers","Chargers"]};case re.CHICAGO_BEARS:return{stadiumNames:["Soldier Field","Soldier"],cityNames:["Chicago, Illinois"],teamNames:["Chicago Bears","Bears"]};case re.ARIZONA_CARDINALS:return{stadiumNames:["State Farm Stadium","Start Farm"],cityNames:["Glendale, Arizona"],teamNames:["Arizona Cardinals","Cardinals"]};case re.JACKSONVILLE_JAGUARS:return{stadiumNames:["TIAA Bank Field","TIAA Bank","TIAA"],cityNames:["Jacksonville, Florida"],teamNames:["Jacksonville Jaguars","Jaguars"]};case re.MINNESOTA_VIKINGS:return{stadiumNames:["U.S. Bank Stadium","U.S. Bank"],cityNames:["Minneapolis, Minnesota"],teamNames:["Minnesota Vikings","Vikings"]};case re.NFL_MEXICO_GAME:return{stadiumNames:["Estadio Azteca"],cityNames:["Mexico City, Mexico"],teamNames:["NFL Mexico Games","NFL Mexico Games"]};case re.HALL_OF_FAME_GAME:return{stadiumNames:["Tom Benson Hall of Fame Stadium","Tom Benson Hall of Fame","Tom Benson"],cityNames:["Canton Ohio"],teamNames:["Hall of Fame Games","Hall of Fame Games"]};case re.NFL_LONDON_GAME:return{stadiumNames:["Wembley Stadium","Wembley"],cityNames:["London, England"],teamNames:["old NFL London Games","old NFL London Games"]};case re.NFL_LONDON_GAME2:return{stadiumNames:["Tottenham Hotspur Stadium","Tottenham Hotspur"],cityNames:["London, England"],teamNames:["new NFL London Games","new NFL London Games"]}}}!function(e){e[e.LAS_VEGAS_RAIDERS=0]="LAS_VEGAS_RAIDERS",e[e.KANSAS_CITY_CHIEFS=1]="KANSAS_CITY_CHIEFS",e[e.DALLAS_COWBOYS=2]="DALLAS_COWBOYS",e[e.CAROLINA_PANTHERS=3]="CAROLINA_PANTHERS",e[e.NEW_ORLEANS_SAINTS=4]="NEW_ORLEANS_SAINTS",e[e.DENVER_BRONCOS=5]="DENVER_BRONCOS",e[e.WASHINGTON_FOOTBALL_TEAM=6]="WASHINGTON_FOOTBALL_TEAM",e[e.CLEVELAND_BROWNS=7]="CLEVELAND_BROWNS",e[e.DETROIT_LIONS=8]="DETROIT_LIONS",e[e.NEW_ENGLAND_PATRIOTS=9]="NEW_ENGLAND_PATRIOTS",e[e.MIAMI_DOLPHINS=10]="MIAMI_DOLPHINS",e[e.PITTSBURGH_STEELERS=11]="PITTSBURGH_STEELERS",e[e.BUFFALO_BILLS=12]="BUFFALO_BILLS",e[e.GREEN_BAY_PACKERS=13]="GREEN_BAY_PACKERS",e[e.SAN_FRANCISCO_49ERS=14]="SAN_FRANCISCO_49ERS",e[e.PHILADELPHIA_EAGLES=15]="PHILADELPHIA_EAGLES",e[e.INDIANAPOLIS_COLTS=16]="INDIANAPOLIS_COLTS",e[e.SEATTLE_SEAHAWKS=17]="SEATTLE_SEAHAWKS",e[e.BALTIMORE_RAVENS=18]="BALTIMORE_RAVENS",e[e.ATLANTA_FALCONS=19]="ATLANTA_FALCONS",e[e.NEW_YORK_JETS=20]="NEW_YORK_JETS",e[e.NEW_YORK_GIANTS=21]="NEW_YORK_GIANTS",e[e.TENNESSEE_TITANS=22]="TENNESSEE_TITANS",e[e.HOUSTON_TEXANS=23]="HOUSTON_TEXANS",e[e.CINCINNATI_BENGALS=24]="CINCINNATI_BENGALS",e[e.TAMPA_BAY_BUCCANEERS=25]="TAMPA_BAY_BUCCANEERS",e[e.LOS_ANGELES_RAMS=26]="LOS_ANGELES_RAMS",e[e.LOS_ANGELES_CHARGERS=27]="LOS_ANGELES_CHARGERS",e[e.CHICAGO_BEARS=28]="CHICAGO_BEARS",e[e.ARIZONA_CARDINALS=29]="ARIZONA_CARDINALS",e[e.JACKSONVILLE_JAGUARS=30]="JACKSONVILLE_JAGUARS",e[e.MINNESOTA_VIKINGS=31]="MINNESOTA_VIKINGS",e[e.NFL_MEXICO_GAME=32]="NFL_MEXICO_GAME",e[e.HALL_OF_FAME_GAME=33]="HALL_OF_FAME_GAME",e[e.NFL_LONDON_GAME=34]="NFL_LONDON_GAME",e[e.NFL_LONDON_GAME2=35]="NFL_LONDON_GAME2"}(re||(re={}));const oe=Object.values(re).filter((e=>"string"==typeof e));const ce=function(){const e=new Map;for(let t=0;t<oe.length;t++){const n=ie(re[oe[t]]);for(let t=0;t<n.stadiumNames.length;t++)e.set(ne(n.stadiumNames[t]),n.stadiumNames[0])}return e}();const le=e=>{let t,n=e.length;for(;0!=n;)t=Math.floor(Math.random()*n),n--,[e[n],e[t]]=[e[t],e[n]];return e},ue=e=>{const t=localStorage.getItem(e);return t?JSON.parse(t):null},me=e=>localStorage.getItem(`${e}-question-set`)||"All",de=()=>localStorage.getItem("mode")||"Show unseen mode",Ne=()=>"false"!==localStorage.getItem("shouldReshowUnknown");class Ae{constructor(){this.getAllAssociatedKeys=e=>[e],this.doesGuessExist=e=>this.allKeys.includes(e),this.getQuestionSet=e=>{const t=this.getQuestionSets();for(let n=0;n<t.length;n++)if(e===t[n].description)return le([...t[n].questions]);return le([...t[0].questions])},this.recalculateEligibleQuestions=()=>{const e=de();let t=this.getQuestionSet(me(this.triviaCategory));if("Show unseen mode"==e){const e=Object.keys(localStorage);t=t.filter((t=>!e.includes(t)))}else"Show unknown mode"==e&&(t=t.filter((e=>{const t=ue(e);return!t||(t.percentCorrect<.6||t.numCorrectGuesses<2)})));if(0==t.length){t=le(this.getQuestionSet("All"))}return this.eligibleQuestions=t,this.eligibleQuestions.length},this.getNextQuestion=(e,t)=>{let n;if(e%5==0&&Ne()){const e=this.getQuestionSet(me(this.triviaCategory));for(let s=0;s<e.length;s++){const a=ue(e[s]);if(a&&e[s]!=t&&a.percentCorrect<.6)return n=e[s],n}}return 0==this.eligibleQuestions.length&&this.recalculateEligibleQuestions(),n=this.eligibleQuestions.pop(),n}}}const Se=new class extends Ae{constructor(){super(...arguments),this.triviaCategory="NFL stadiums",this.questionType="Stadium",this.allKeys=oe,this.doesGuessExist=e=>null!=this.getOfficialGuess(e),this.getKeysFromGuess=e=>{const t=this.getOfficialGuess(e);return t?function(e){const t=[];for(let n=0;n<oe.length;n++)ie(re[oe[n]]).stadiumNames[0]===e&&t.push(oe[n]);return t}(t):[]},this.getAllAssociatedKeys=e=>"New York Jets"===e||"New York Giants"===e?["New York Jets","New York Giants"]:"Los Angeles Rams"===e||"Los Angeles Chargers"===e?["Los Angeles Rams","Los Angeles Chargers"]:[e],this.isCorrectAnswer=(e,t)=>{const n=ie(re[e]).stadiumNames;for(let e=0;e<n.length;e++)if(ee(n[e],t))return!0;return!1},this.getOfficialGuess=e=>ce.get(ne(e)),this.getQuestionSets=()=>[{description:"All",questions:this.allKeys},{description:"Additional stadiums",questions:[re.NFL_MEXICO_GAME,re.HALL_OF_FAME_GAME,re.NFL_LONDON_GAME,re.NFL_LONDON_GAME2].map((e=>re[e]))},{description:"AFC",questions:[re.BUFFALO_BILLS,re.MIAMI_DOLPHINS,re.NEW_ENGLAND_PATRIOTS,re.NEW_YORK_JETS,re.BALTIMORE_RAVENS,re.CINCINNATI_BENGALS,re.CLEVELAND_BROWNS,re.PITTSBURGH_STEELERS,re.HOUSTON_TEXANS,re.INDIANAPOLIS_COLTS,re.JACKSONVILLE_JAGUARS,re.TENNESSEE_TITANS,re.DENVER_BRONCOS,re.KANSAS_CITY_CHIEFS,re.LAS_VEGAS_RAIDERS,re.LOS_ANGELES_CHARGERS].map((e=>re[e]))},{description:"NFC",questions:[re.DALLAS_COWBOYS,re.NEW_YORK_GIANTS,re.PHILADELPHIA_EAGLES,re.WASHINGTON_FOOTBALL_TEAM,re.CHICAGO_BEARS,re.DETROIT_LIONS,re.GREEN_BAY_PACKERS,re.MINNESOTA_VIKINGS,re.ATLANTA_FALCONS,re.CAROLINA_PANTHERS,re.NEW_ORLEANS_SAINTS,re.TAMPA_BAY_BUCCANEERS,re.ARIZONA_CARDINALS,re.LOS_ANGELES_RAMS,re.SAN_FRANCISCO_49ERS,re.SEATTLE_SEAHAWKS].map((e=>re[e]))}]}};function ge(e,t,n){const s=e.slice();return s[7]=t[n],s}const fe=e=>({keys:9&e}),pe=e=>({keys:e[0].getKeysFromGuess(e[7])}),he=e=>({keys:5&e}),_e=e=>({keys:e[0].getAllAssociatedKeys(e[2])}),Ee=e=>({keys:5&e}),Le=e=>({keys:e[0].getAllAssociatedKeys(e[2])});function Ce(e){let t,n;const s=e[5].answer,a=l(s,e,e[4],_e);return{c(){t=_("Wrong! "),a&&a.c()},m(e,s){S(e,t,s),a&&a.m(e,s),n=!0},p(e,t){a&&a.p&&(!n||21&t)&&d(a,s,e,e[4],n?m(s,e[4],t,he):N(e[4]),_e)},i(e){n||(Y(a,e),n=!0)},o(e){V(a,e),n=!1},d(e){e&&g(t),a&&a.d(e)}}}function ye(e){let t,n;const s=e[5].answer,a=l(s,e,e[4],Le);return{c(){t=_("Correct! "),a&&a.c()},m(e,s){S(e,t,s),a&&a.m(e,s),n=!0},p(e,t){a&&a.p&&(!n||21&t)&&d(a,s,e,e[4],n?m(s,e[4],t,Ee):N(e[4]),Le)},i(e){n||(Y(a,e),n=!0)},o(e){V(a,e),n=!1},d(e){e&&g(t),a&&a.d(e)}}}function Oe(e){let t,n,s,a,r,i,o,c,l,u,m,d,N=e[3].numCorrectGuesses+"",f=e[3].numTotalGuesses+"",h=100*e[3].percentCorrect+"",E=e[3].incorrectGuesses.length>0&&Te(e);return{c(){t=_("You've gotten this right "),n=p("b"),s=_(N),a=_("/"),r=_(f),i=_("\r\n        ("),o=p("b"),c=_(h),l=_("%"),u=_(") times.\r\n        "),E&&E.c(),m=L()},m(e,N){S(e,t,N),S(e,n,N),A(n,s),A(n,a),A(n,r),S(e,i,N),S(e,o,N),A(o,c),A(o,l),S(e,u,N),E&&E.m(e,N),S(e,m,N),d=!0},p(e,t){(!d||8&t)&&N!==(N=e[3].numCorrectGuesses+"")&&T(s,N),(!d||8&t)&&f!==(f=e[3].numTotalGuesses+"")&&T(r,f),(!d||8&t)&&h!==(h=100*e[3].percentCorrect+"")&&T(c,h),e[3].incorrectGuesses.length>0?E?(E.p(e,t),8&t&&Y(E,1)):(E=Te(e),E.c(),Y(E,1),E.m(m.parentNode,m)):E&&(W(),V(E,1,1,(()=>{E=null})),Q())},i(e){d||(Y(E),d=!0)},o(e){V(E),d=!1},d(e){e&&g(t),e&&g(n),e&&g(i),e&&g(o),e&&g(u),E&&E.d(e),e&&g(m)}}}function Te(e){let t,n,s,a=e[3].incorrectGuesses,r=[];for(let t=0;t<a.length;t+=1)r[t]=$e(ge(e,a,t));const i=e=>V(r[e],1,1,(()=>{r[e]=null}));return{c(){t=_("Previous guesses:\r\n            "),n=p("ul");for(let e=0;e<r.length;e+=1)r[e].c()},m(e,a){S(e,t,a),S(e,n,a);for(let e=0;e<r.length;e+=1)r[e].m(n,null);s=!0},p(e,t){if(25&t){let s;for(a=e[3].incorrectGuesses,s=0;s<a.length;s+=1){const i=ge(e,a,s);r[s]?(r[s].p(i,t),Y(r[s],1)):(r[s]=$e(i),r[s].c(),Y(r[s],1),r[s].m(n,null))}for(W(),s=a.length;s<r.length;s+=1)i(s);Q()}},i(e){if(!s){for(let e=0;e<a.length;e+=1)Y(r[e]);s=!0}},o(e){r=r.filter(Boolean);for(let e=0;e<r.length;e+=1)V(r[e]);s=!1},d(e){e&&g(t),e&&g(n),f(r,e)}}}function Ie(t){let n,s,a,r,i,o=t[7]+"",c=t[0].questionType.toLowerCase()+"";return{c(){n=p("li"),s=_(o),a=_(" (not a "),r=_(c),i=_(")")},m(e,t){S(e,n,t),A(n,s),A(n,a),A(n,r),A(n,i)},p(e,t){8&t&&o!==(o=e[7]+"")&&T(s,o),1&t&&c!==(c=e[0].questionType.toLowerCase()+"")&&T(r,c)},i:e,o:e,d(e){e&&g(n)}}}function Re(e){let t,n,s;const a=e[5]["previous-answer"],r=l(a,e,e[4],pe);return{c(){t=p("li"),r&&r.c(),n=E()},m(e,a){S(e,t,a),r&&r.m(t,null),A(t,n),s=!0},p(e,t){r&&r.p&&(!s||25&t)&&d(r,a,e,e[4],s?m(a,e[4],t,fe):N(e[4]),pe)},i(e){s||(Y(r,e),s=!0)},o(e){V(r,e),s=!1},d(e){e&&g(t),r&&r.d(e)}}}function $e(e){let t,n,s,a,r;const i=[Re,Ie],o=[];function c(e,n){return(null==t||9&n)&&(t=!!e[0].doesGuessExist(e[7])),t?0:1}return n=c(e,-1),s=o[n]=i[n](e),{c(){s.c(),a=L()},m(e,t){o[n].m(e,t),S(e,a,t),r=!0},p(e,t){let r=n;n=c(e,t),n===r?o[n].p(e,t):(W(),V(o[r],1,1,(()=>{o[r]=null})),Q(),s=o[n],s?s.p(e,t):(s=o[n]=i[n](e),s.c()),Y(s,1),s.m(a.parentNode,a))},i(e){r||(Y(s),r=!0)},o(e){V(s),r=!1},d(e){o[n].d(e),e&&g(a)}}}function ve(e){let t,n,s,a,r,i,o,c,l,u;const m=[ye,Ce],d=[];function N(e,t){return e[1]?0:1}n=N(e),s=d[n]=m[n](e);let A=e[3]&&Oe(e);return{c(){t=p("p"),s.c(),a=E(),r=p("button"),r.textContent="Next",i=E(),o=p("section"),A&&A.c(),O(t,"id","results"),O(t,"class","svelte-11mfyaa"),O(r,"id","next-button"),r.autofocus=!0,O(o,"id","additional-info"),O(o,"class","svelte-11mfyaa")},m(s,m){S(s,t,m),d[n].m(t,null),S(s,a,m),S(s,r,m),S(s,i,m),S(s,o,m),A&&A.m(o,null),c=!0,r.focus(),l||(u=C(r,"click",e[6]),l=!0)},p(e,[a]){let r=n;n=N(e),n===r?d[n].p(e,a):(W(),V(d[r],1,1,(()=>{d[r]=null})),Q(),s=d[n],s?s.p(e,a):(s=d[n]=m[n](e),s.c()),Y(s,1),s.m(t,null)),e[3]?A?(A.p(e,a),8&a&&Y(A,1)):(A=Oe(e),A.c(),Y(A,1),A.m(o,null)):A&&(W(),V(A,1,1,(()=>{A=null})),Q())},i(e){c||(Y(s),Y(A),c=!0)},o(e){V(s),V(A),c=!1},d(e){e&&g(t),d[n].d(),e&&g(a),e&&g(r),e&&g(i),e&&g(o),A&&A.d(),l=!1,u()}}}function Ge(e,t,n){let{$$slots:s={},$$scope:a}=t,{questionSetHandler:r}=t,{wasCorrectAnswer:i}=t,{currentKey:o}=t,{stats:c}=t;return e.$$set=e=>{"questionSetHandler"in e&&n(0,r=e.questionSetHandler),"wasCorrectAnswer"in e&&n(1,i=e.wasCorrectAnswer),"currentKey"in e&&n(2,o=e.currentKey),"stats"in e&&n(3,c=e.stats),"$$scope"in e&&n(4,a=e.$$scope)},[r,i,o,c,a,s,function(t){v.call(this,e,t)}]}class we extends Z{constructor(e){super(),X(this,e,Ge,ve,r,{questionSetHandler:0,wasCorrectAnswer:1,currentKey:2,stats:3})}}function Me(e,t,n){const s=e.slice();return s[14]=t[n],s}function Fe(e){let t,n,s,a,r,i,o,c,l,u,m,d,N=e[14].description+"",f=e[14].questions.length+"";return{c(){t=p("label"),n=p("input"),r=E(),i=_(N),o=_(" ("),c=_(f),l=_(")"),O(n,"type","radio"),O(n,"id",s=e[14].description),O(n,"name","question-set"),n.__value=a=e[14].description,n.value=n.__value,O(n,"class","svelte-1rnc7l3"),e[6][0].push(n),O(t,"for",u=e[14].description),O(t,"class","svelte-1rnc7l3")},m(s,a){S(s,t,a),A(t,n),n.checked=n.__value===e[1],A(t,r),A(t,i),A(t,o),A(t,c),A(t,l),m||(d=C(n,"change",e[5]),m=!0)},p(e,r){1&r&&s!==(s=e[14].description)&&O(n,"id",s),1&r&&a!==(a=e[14].description)&&(n.__value=a,n.value=n.__value),2&r&&(n.checked=n.__value===e[1]),1&r&&N!==(N=e[14].description+"")&&T(i,N),1&r&&f!==(f=e[14].questions.length+"")&&T(c,f),1&r&&u!==(u=e[14].description)&&O(t,"for",u)},d(s){s&&g(t),e[6][0].splice(e[6][0].indexOf(n),1),m=!1,d()}}}function Be(t){let n,a,r,i,o,c,l,u,m,d,N,h,L,T,I,R,$,v,G,w,M,F,B,H,b,k,x,K,D=t[0].getQuestionSets(),P=[];for(let e=0;e<D.length;e+=1)P[e]=Fe(Me(t,D,e));return{c(){n=p("section"),a=p("form"),r=p("p"),r.innerHTML="<b>Question set</b>",i=E();for(let e=0;e<P.length;e+=1)P[e].c();o=E(),c=p("p"),c.innerHTML="<b>Filter out</b>",l=E(),u=p("label"),m=p("input"),d=_("\r\n            Do not hide any questions"),N=E(),h=p("label"),L=p("input"),T=_("\r\n            Hide questions I've already seen"),I=E(),R=p("label"),$=p("input"),v=_("\r\n            Hide questions I've gotten right >60% of the time"),G=E(),w=p("p"),w.innerHTML="<b>Extra settings</b>",M=E(),F=p("label"),B=p("input"),H=_("\r\n            Show questions I've gotten wrong more often"),b=E(),k=p("button"),k.textContent="Exit",O(r,"class","settings-category svelte-1rnc7l3"),O(c,"class","settings-category svelte-1rnc7l3"),O(m,"type","radio"),O(m,"id","show-all-mode"),O(m,"name","mode"),m.__value="Show all mode",m.value=m.__value,O(m,"class","svelte-1rnc7l3"),t[6][1].push(m),O(u,"for","show-all-mode"),O(u,"class","svelte-1rnc7l3"),O(L,"type","radio"),O(L,"id","show-unseen-mode"),O(L,"name","mode"),L.__value="Show unseen mode",L.value=L.__value,O(L,"class","svelte-1rnc7l3"),t[6][1].push(L),O(h,"for","show-unseen-mode"),O(h,"class","svelte-1rnc7l3"),O($,"type","radio"),O($,"id","show-unknown-mode"),O($,"name","mode"),$.__value="Show unknown mode",$.value=$.__value,O($,"class","svelte-1rnc7l3"),t[6][1].push($),O(R,"for","show-unknown-mode"),O(R,"class","svelte-1rnc7l3"),O(w,"class","settings-category svelte-1rnc7l3"),O(B,"type","checkbox"),O(B,"id","reshow-unknown"),O(B,"name","reshow-unknwon"),B.__value="Re-show unknown",B.value=B.__value,O(B,"class","svelte-1rnc7l3"),O(F,"for","reshow-unknown"),O(F,"class","svelte-1rnc7l3"),O(k,"id","exit"),O(a,"class","svelte-1rnc7l3"),O(n,"id","settings-section"),O(n,"class","svelte-1rnc7l3")},m(e,s){S(e,n,s),A(n,a),A(a,r),A(a,i);for(let e=0;e<P.length;e+=1)P[e].m(a,null);A(a,o),A(a,c),A(a,l),A(a,u),A(u,m),m.checked=m.__value===t[2],A(u,d),A(a,N),A(a,h),A(h,L),L.checked=L.__value===t[2],A(h,T),A(a,I),A(a,R),A(R,$),$.checked=$.__value===t[2],A(R,v),A(a,G),A(a,w),A(a,M),A(a,F),A(F,B),B.checked=t[3],A(F,H),A(a,b),A(a,k),x||(K=[C(m,"change",t[7]),C(L,"change",t[8]),C($,"change",t[9]),C(B,"change",t[10]),C(k,"click",y(t[4]))],x=!0)},p(e,[t]){if(3&t){let n;for(D=e[0].getQuestionSets(),n=0;n<D.length;n+=1){const s=Me(e,D,n);P[n]?P[n].p(s,t):(P[n]=Fe(s),P[n].c(),P[n].m(a,o))}for(;n<P.length;n+=1)P[n].d(1);P.length=D.length}4&t&&(m.checked=m.__value===e[2]),4&t&&(L.checked=L.__value===e[2]),4&t&&($.checked=$.__value===e[2]),8&t&&(B.checked=e[3])},i:e,o:e,d(e){e&&g(n),f(P,e),t[6][1].splice(t[6][1].indexOf(m),1),t[6][1].splice(t[6][1].indexOf(L),1),t[6][1].splice(t[6][1].indexOf($),1),x=!1,s(K)}}}function He(e,t,n){let{questionSetHandler:s}=t,a=$(),r=me(s.triviaCategory),i=de(),o=r,c=i,l=Ne();return e.$$set=e=>{"questionSetHandler"in e&&n(0,s=e.questionSetHandler)},[s,o,c,l,()=>{const e=o!=r||c!=i;e&&(localStorage.setItem(`${s.triviaCategory}-question-set`,o),localStorage.setItem("mode",c)),localStorage.setItem("shouldReshowUnknown",l.toString()),a("settingsClosed",e)},function(){o=this.__value,n(1,o)},[[],[]],function(){c=this.__value,n(2,c)},function(){c=this.__value,n(2,c)},function(){c=this.__value,n(2,c)},function(){l=this.checked,n(3,l)}]}class be extends Z{constructor(e){super(),X(this,e,He,Be,r,{questionSetHandler:0})}}function ke(t){let n,s,a,r,i,o,c,l,u,m,d,N;return{c(){n=p("section"),s=p("p"),a=_(t[0]),r=_("/"),i=_(t[1]),o=E(),c=h("svg"),l=h("g"),u=h("path"),m=h("path"),O(s,"id","counter"),O(s,"class","svelte-4x9h25"),O(u,"d","M0,0h24v24H0V0z"),O(u,"fill","none"),O(m,"d","M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"),O(c,"id","settings-icon"),O(c,"height","24px"),O(c,"viewBox","0 0 24 24"),O(c,"width","24px"),O(c,"class","svelte-4x9h25"),O(n,"id","top-bar"),O(n,"class","svelte-4x9h25")},m(e,g){S(e,n,g),A(n,s),A(s,a),A(s,r),A(s,i),A(n,o),A(n,c),A(c,l),A(l,u),A(l,m),d||(N=C(c,"click",t[2]),d=!0)},p(e,[t]){1&t&&T(a,e[0]),2&t&&T(i,e[1])},i:e,o:e,d(e){e&&g(n),d=!1,N()}}}function xe(e,t,n){let{numQuestionsAnswered:s}=t,{numEligibleQuestions:a}=t;return e.$$set=e=>{"numQuestionsAnswered"in e&&n(0,s=e.numQuestionsAnswered),"numEligibleQuestions"in e&&n(1,a=e.numEligibleQuestions)},[s,a,function(t){v.call(this,e,t)}]}class Ke extends Z{constructor(e){super(),X(this,e,xe,ke,r,{numQuestionsAnswered:0,numEligibleQuestions:1})}}const De=e=>({currentKey:16384&e}),Pe=e=>({slot:"answer",currentKey:e[14]}),qe=e=>({currentKey:16384&e}),We=e=>({slot:"previous-answer",currentKey:e[14]}),Qe=e=>({currentKey:8&e}),Ye=e=>({currentKey:e[3],isResult:!1});function Ve(e){let t,n;return t=new be({props:{questionSetHandler:e[0]}}),t.$on("settingsClosed",e[10]),{c(){J(t.$$.fragment)},m(e,s){U(t,e,s),n=!0},p(e,n){const s={};1&n&&(s.questionSetHandler=e[0]),t.$set(s)},i(e){n||(Y(t.$$.fragment,e),n=!0)},o(e){V(t.$$.fragment,e),n=!1},d(e){z(t,e)}}}function Je(t){let n,s,a,r,i,o,c;return{c(){n=p("form"),s=p("input"),r=E(),i=p("button"),i.textContent="Submit",O(s,"type","text"),O(s,"id","input"),O(s,"title",a="Guess the "+t[0].questionType.toLowerCase()),O(s,"autocomplete","off"),s.autofocus=!0,O(s,"class","svelte-24nrst"),O(i,"id","submit-button")},m(e,a){S(e,n,a),A(n,s),A(n,r),A(n,i),s.focus(),o||(c=C(n,"submit",y(t[9])),o=!0)},p(e,t){1&t&&a!==(a="Guess the "+e[0].questionType.toLowerCase())&&O(s,"title",a)},i:e,o:e,d(e){e&&g(n),o=!1,c()}}}function Ue(e){let t,n;return t=new we({props:{questionSetHandler:e[0],wasCorrectAnswer:e[7],currentKey:e[3],stats:e[6],$$slots:{"previous-answer":[je,({keys:e})=>({14:e}),({keys:e})=>e?16384:0],answer:[ze,({keys:e})=>({14:e}),({keys:e})=>e?16384:0]},$$scope:{ctx:e}}}),t.$on("click",e[8]),{c(){J(t.$$.fragment)},m(e,s){U(t,e,s),n=!0},p(e,n){const s={};1&n&&(s.questionSetHandler=e[0]),128&n&&(s.wasCorrectAnswer=e[7]),8&n&&(s.currentKey=e[3]),64&n&&(s.stats=e[6]),24576&n&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){n||(Y(t.$$.fragment,e),n=!0)},o(e){V(t.$$.fragment,e),n=!1},d(e){z(t,e)}}}function ze(e){let t;const n=e[12].answer,s=l(n,e,e[13],Pe);return{c(){s&&s.c()},m(e,n){s&&s.m(e,n),t=!0},p(e,a){s&&s.p&&(!t||24576&a)&&d(s,n,e,e[13],t?m(n,e[13],a,De):N(e[13]),Pe)},i(e){t||(Y(s,e),t=!0)},o(e){V(s,e),t=!1},d(e){s&&s.d(e)}}}function je(e){let t;const n=e[12]["previous-answer"],s=l(n,e,e[13],We);return{c(){s&&s.c()},m(e,n){s&&s.m(e,n),t=!0},p(e,a){s&&s.p&&(!t||24576&a)&&d(s,n,e,e[13],t?m(n,e[13],a,qe):N(e[13]),We)},i(e){t||(Y(s,e),t=!0)},o(e){V(s,e),t=!1},d(e){s&&s.d(e)}}}function Xe(e){let t,n,s,a,r,i,o,c,u=e[4]&&Ve(e);s=new Ke({props:{numQuestionsAnswered:e[1],numEligibleQuestions:e[2]}}),s.$on("click",e[11]);const f=e[12].question,h=l(f,e,e[13],Ye),_=[Ue,Je],L=[];function C(e,t){return e[5]?0:1}return i=C(e),o=L[i]=_[i](e),{c(){u&&u.c(),t=E(),n=p("section"),J(s.$$.fragment),a=E(),h&&h.c(),r=E(),o.c(),O(n,"id","quiz-section"),O(n,"class","svelte-24nrst"),I(n,"success-animation",e[5]&&e[7]),I(n,"error-animation",e[5]&&!e[7])},m(e,o){u&&u.m(e,o),S(e,t,o),S(e,n,o),U(s,n,null),A(n,a),h&&h.m(n,null),A(n,r),L[i].m(n,null),c=!0},p(e,[a]){e[4]?u?(u.p(e,a),16&a&&Y(u,1)):(u=Ve(e),u.c(),Y(u,1),u.m(t.parentNode,t)):u&&(W(),V(u,1,1,(()=>{u=null})),Q());const r={};2&a&&(r.numQuestionsAnswered=e[1]),4&a&&(r.numEligibleQuestions=e[2]),s.$set(r),h&&h.p&&(!c||8200&a)&&d(h,f,e,e[13],c?m(f,e[13],a,Qe):N(e[13]),Ye);let l=i;i=C(e),i===l?L[i].p(e,a):(W(),V(L[l],1,1,(()=>{L[l]=null})),Q(),o=L[i],o?o.p(e,a):(o=L[i]=_[i](e),o.c()),Y(o,1),o.m(n,null)),160&a&&I(n,"success-animation",e[5]&&e[7]),160&a&&I(n,"error-animation",e[5]&&!e[7])},i(e){c||(Y(u),Y(s.$$.fragment,e),Y(h,e),Y(o),c=!0)},o(e){V(u),V(s.$$.fragment,e),V(h,e),V(o),c=!1},d(e){u&&u.d(e),e&&g(t),e&&g(n),z(s),h&&h.d(e),L[i].d()}}}function Ze(e,t,n){let s,a,{$$slots:r={},$$scope:i}=t,{questionSetHandler:o}=t,c=0,l=o.recalculateEligibleQuestions(),u=o.getNextQuestion(c),m=!1,d=!1;return o.recalculateEligibleQuestions(),e.$$set=e=>{"questionSetHandler"in e&&n(0,o=e.questionSetHandler),"$$scope"in e&&n(13,i=e.$$scope)},[o,c,l,u,m,d,s,a,()=>{n(1,c=(c+1)%l),n(3,u=o.getNextQuestion(c,u)),n(5,d=!1)},e=>{const t=e.target.input.value;n(7,a=o.isCorrectAnswer(u,t)),((e,t,n,s)=>{const a=localStorage.getItem(e),r=a?JSON.parse(a):{numCorrectGuesses:0,numIncorrectGuesses:0,numTotalGuesses:0,percentCorrect:0,incorrectGuesses:[]};if(r.numTotalGuesses+=1,t)r.numCorrectGuesses+=1;else{r.numIncorrectGuesses+=1;let e=s(ne(n));null==e&&(e=n.trim()),e&&!r.incorrectGuesses.includes(e)&&r.incorrectGuesses.push(e)}r.percentCorrect=r.numCorrectGuesses/r.numTotalGuesses,localStorage.setItem(e,JSON.stringify(r))})(u,a,t,o.getOfficialGuess),n(5,d=!0),n(6,s=ue(u))},e=>{e.detail&&(n(2,l=o.recalculateEligibleQuestions()),n(3,u=o.getNextQuestion(c,u)),n(1,c=0),n(5,d=!1)),n(4,m=!1)},()=>{n(4,m=!0)},r,i]}class et extends Z{constructor(e){super(),X(this,e,Ze,Xe,r,{questionSetHandler:0})}}function tt(e){let t,n,s,a,r,i,o=e[1](e[5])+"";return{c(){t=p("span"),n=_("What is the stadium name for\r\n        "),s=p("span"),a=_("the "),r=_(o),i=_("?"),O(s,"class","team-name svelte-l9pmfy"),O(t,"slot","question")},m(e,o){S(e,t,o),A(t,n),A(t,s),A(s,a),A(s,r),A(t,i)},p(e,t){32&t&&o!==(o=e[1](e[5])+"")&&T(r,o)},d(e){e&&g(t)}}}function nt(e){let t,n,s,a,r,i=e[2](e[5][1])+"";return{c(){t=_("and "),n=p("span"),s=_("the "),a=_(i),r=E(),O(n,"class","team-name svelte-l9pmfy")},m(e,i){S(e,t,i),S(e,n,i),A(n,s),A(n,a),S(e,r,i)},p(e,t){32&t&&i!==(i=e[2](e[5][1])+"")&&T(a,i)},d(e){e&&g(t),e&&g(n),e&&g(r)}}}function st(e){let t,n,s,a,r,i,o,c,l,u,m,d,N=e[2](e[5][0])+"",f=e[3](e[5][0])+"",h=e[4](e[5][0])+"",L=e[5][1]&&nt(e);return{c(){t=p("span"),n=p("span"),s=_("The "),a=_(N),r=E(),L&&L.c(),i=_("are at "),o=p("span"),c=_(f),l=_("\r\n        in "),u=p("span"),m=_(h),d=_("."),O(n,"class","team-name svelte-l9pmfy"),O(o,"class","stadium-name svelte-l9pmfy"),O(u,"class","city-name svelte-l9pmfy"),O(t,"slot","answer")},m(e,N){S(e,t,N),A(t,n),A(n,s),A(n,a),A(t,r),L&&L.m(t,null),A(t,i),A(t,o),A(o,c),A(t,l),A(t,u),A(u,m),A(t,d)},p(e,n){32&n&&N!==(N=e[2](e[5][0])+"")&&T(a,N),e[5][1]?L?L.p(e,n):(L=nt(e),L.c(),L.m(t,i)):L&&(L.d(1),L=null),32&n&&f!==(f=e[3](e[5][0])+"")&&T(c,f),32&n&&h!==(h=e[4](e[5][0])+"")&&T(m,h)},d(e){e&&g(t),L&&L.d()}}}function at(e){let t,n,s,a,r,i=e[2](e[5][1])+"";return{c(){t=_("and "),n=p("span"),s=_("the "),a=_(i),r=E(),O(n,"class","team-name svelte-l9pmfy")},m(e,i){S(e,t,i),S(e,n,i),A(n,s),A(n,a),S(e,r,i)},p(e,t){32&t&&i!==(i=e[2](e[5][1])+"")&&T(a,i)},d(e){e&&g(t),e&&g(n),e&&g(r)}}}function rt(e){let t,n,s,a,r,i,o,c,l,u,m,d,N=e[2](e[5][0])+"",f=e[3](e[5][0])+"",h=e[4](e[5][0])+"",L=e[5][1]&&at(e);return{c(){t=p("span"),n=p("span"),s=_("The "),a=_(N),r=E(),L&&L.c(),i=_("are at "),o=p("span"),c=_(f),l=_("\r\n        in "),u=p("span"),m=_(h),d=_("."),O(n,"class","team-name svelte-l9pmfy"),O(o,"class","stadium-name svelte-l9pmfy"),O(u,"class","city-name svelte-l9pmfy"),O(t,"slot","previous-answer")},m(e,N){S(e,t,N),A(t,n),A(n,s),A(n,a),A(t,r),L&&L.m(t,null),A(t,i),A(t,o),A(o,c),A(t,l),A(t,u),A(u,m),A(t,d)},p(e,n){32&n&&N!==(N=e[2](e[5][0])+"")&&T(a,N),e[5][1]?L?L.p(e,n):(L=at(e),L.c(),L.m(t,i)):L&&(L.d(1),L=null),32&n&&f!==(f=e[3](e[5][0])+"")&&T(c,f),32&n&&h!==(h=e[4](e[5][0])+"")&&T(m,h)},d(e){e&&g(t),L&&L.d()}}}function it(e){let t,n;return t=new et({props:{questionSetHandler:e[0],$$slots:{"previous-answer":[rt,({currentKey:e})=>({5:e}),({currentKey:e})=>e?32:0],answer:[st,({currentKey:e})=>({5:e}),({currentKey:e})=>e?32:0],question:[tt,({currentKey:e})=>({5:e}),({currentKey:e})=>e?32:0]},$$scope:{ctx:e}}}),{c(){J(t.$$.fragment)},m(e,s){U(t,e,s),n=!0},p(e,[n]){const s={};96&n&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){n||(Y(t.$$.fragment,e),n=!0)},o(e){V(t.$$.fragment,e),n=!1},d(e){z(t,e)}}}function ot(e){return[Se,e=>ie(re[e]).teamNames[1],e=>ie(re[e]).teamNames[0],e=>ie(re[e]).stadiumNames[0],e=>ie(re[e]).cityNames[0]]}class ct extends Z{constructor(e){super(),X(this,e,ot,it,r,{})}}const lt=["Acura.png","Alfa Romeo.png","Aston Martin.png","Audi.png","Bentley.png","BMW.png","Bugatti.png","Buick.png","Cadillac.png","Chevrolet,Chevy.png","Chrysler.png","Citroen.png","Ferrari.png","Fiat.png","Ford.png","Genesis,Hyundai Genesis.png","Honda.png","Hyundai.png","Infiniti.png","Jaguar.png","Kia.png","Koenigsegg.png","Lamborghini,Lambo.png","Land Rover.png","Lexus.png","Lincoln.png","Maserati.png","Mazda.png","Mercedes-Benz,Mercedes.png","Mercury.png","Mini.png","Mitsubishi.png","Nissan.png","Oldsmobile.png","Peugeot.png","Pontiac.png","Porsche.png","Ram Trucks,RAM,Dodge RAM.png","Renault.png","Saab.png","Saturn.png","Scion.png","Smart.png","Subaru.png","Suzuki.png","Tesla.png","Toyota.png","Volkswagen,VW.png","Volvo.png"].map((e=>`carlogos/images/${e}`));console.log(lt);const ut=function(){const e=new Map;for(let t=0;t<lt.length;t++){const n=lt[t].split("/")[2].split(".")[0].split(",");n.forEach((t=>e.set(ne(t),n[0])))}return e}(),mt=e=>e.split("/")[2].split(".")[0].split(",")[0];const dt=function(){const e=new Map;for(let t=0;t<lt.length;t++){const n=lt[t],s=n.split("/")[2].split(".")[0].split(",");e.set(s[0],n)}return e}();function Nt(e,t){if(t=t||0,e&&e.length>t){const n=new Image;n.onload=function(){Nt(e,t+1)},n.src=e[t]}}const At=new class extends Ae{constructor(){super(...arguments),this.triviaCategory="Car logos",this.questionType="Car brand",this.allKeys=lt,this.doesGuessExist=e=>null!=this.getOfficialGuess(e),this.getKeysFromGuess=e=>{const t=this.getOfficialGuess(e);return t?[dt.get(t)]:[]},this.isCorrectAnswer=(e,t)=>{var n;const s=mt(e);return ee(s,null!==(n=this.getOfficialGuess(t))&&void 0!==n?n:"")},this.getOfficialGuess=e=>ut.get(ne(e)),this.getQuestionSets=()=>[{description:"All",questions:this.allKeys}]}};function St(e){let t,n,s;return{c(){t=p("span"),n=p("img"),O(n,"class","logo svelte-13jupw"),c(n.src,s=e[1])||O(n,"src",s),O(n,"alt","Car logo"),O(t,"slot","question")},m(e,s){S(e,t,s),A(t,n)},p(e,t){2&t&&!c(n.src,s=e[1])&&O(n,"src",s)},d(e){e&&g(t)}}}function gt(e){let t,n,s,a,r=mt(e[1][0])+"";return{c(){t=p("span"),n=_("The answer is "),s=p("b"),a=_(r),O(t,"slot","answer")},m(e,r){S(e,t,r),A(t,n),A(t,s),A(s,a)},p(e,t){2&t&&r!==(r=mt(e[1][0])+"")&&T(a,r)},d(e){e&&g(t)}}}function ft(e){let t,n,s,a,r,i=mt(e[1][0])+"";return{c(){t=p("span"),n=_(i),s=_(":\r\n        "),a=p("img"),O(a,"class","mini-logo svelte-13jupw"),c(a.src,r=e[1][0])||O(a,"src",r),O(a,"alt","Car logo"),O(t,"slot","previous-answer")},m(e,r){S(e,t,r),A(t,n),A(t,s),A(t,a)},p(e,t){2&t&&i!==(i=mt(e[1][0])+"")&&T(n,i),2&t&&!c(a.src,r=e[1][0])&&O(a,"src",r)},d(e){e&&g(t)}}}function pt(e){let t,n;return t=new et({props:{questionSetHandler:e[0],$$slots:{"previous-answer":[ft,({currentKey:e})=>({1:e}),({currentKey:e})=>e?2:0],answer:[gt,({currentKey:e})=>({1:e}),({currentKey:e})=>e?2:0],question:[St,({currentKey:e})=>({1:e}),({currentKey:e})=>e?2:0]},$$scope:{ctx:e}}}),{c(){J(t.$$.fragment)},m(e,s){U(t,e,s),n=!0},p(e,[n]){const s={};6&n&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){n||(Y(t.$$.fragment,e),n=!0)},o(e){V(t.$$.fragment,e),n=!1},d(e){z(t,e)}}}function ht(e){const t=At;return Nt(lt,0),[t]}class _t extends Z{constructor(e){super(),X(this,e,ht,pt,r,{})}}function Et(e,t,n){const s=e.slice();return s[3]=t[n],s}function Lt(e){let t,n,s,a,r,i=e[3]+"";function o(){return e[2](e[3])}return{c(){t=p("li"),n=_(i),s=E(),O(t,"class","svelte-9kupn9"),I(t,"active-tab",e[3]===e[0])},m(e,i){S(e,t,i),A(t,n),A(t,s),a||(r=C(t,"click",o),a=!0)},p(n,s){e=n,3&s&&I(t,"active-tab",e[3]===e[0])},d(e){e&&g(t),a=!1,r()}}}function Ct(e){let t,n,s;return n=new _t({}),{c(){t=p("span"),J(n.$$.fragment)},m(e,a){S(e,t,a),U(n,t,null),s=!0},i(e){s||(Y(n.$$.fragment,e),s=!0)},o(e){V(n.$$.fragment,e),s=!1},d(e){e&&g(t),z(n)}}}function yt(e){let t,n;return t=new ct({}),{c(){J(t.$$.fragment)},m(e,s){U(t,e,s),n=!0},i(e){n||(Y(t.$$.fragment,e),n=!0)},o(e){V(t.$$.fragment,e),n=!1},d(e){z(t,e)}}}function Ot(e){let t,n,s,a,r,i,o=e[1],c=[];for(let t=0;t<o.length;t+=1)c[t]=Lt(Et(e,o,t));const l=[yt,Ct],u=[];function m(e,t){return e[0]==Tt?0:e[0]==It?1:-1}return~(a=m(e))&&(r=u[a]=l[a](e)),{c(){t=p("main"),n=p("ul");for(let e=0;e<c.length;e+=1)c[e].c();s=E(),r&&r.c(),O(n,"class","svelte-9kupn9"),O(t,"class","svelte-9kupn9")},m(e,r){S(e,t,r),A(t,n);for(let e=0;e<c.length;e+=1)c[e].m(n,null);A(t,s),~a&&u[a].m(t,null),i=!0},p(e,[s]){if(3&s){let t;for(o=e[1],t=0;t<o.length;t+=1){const a=Et(e,o,t);c[t]?c[t].p(a,s):(c[t]=Lt(a),c[t].c(),c[t].m(n,null))}for(;t<c.length;t+=1)c[t].d(1);c.length=o.length}let i=a;a=m(e),a!==i&&(r&&(W(),V(u[i],1,1,(()=>{u[i]=null})),Q()),~a?(r=u[a],r||(r=u[a]=l[a](e),r.c()),Y(r,1),r.m(t,null)):r=null)},i(e){i||(Y(r),i=!0)},o(e){V(r),i=!1},d(e){e&&g(t),f(c,e),~a&&u[a].d()}}}const Tt="NFL stadiums",It="Car logos";function Rt(e,t,n){let s=localStorage.getItem("trivia-category")??Tt;return[s,[Tt,It],e=>{n(0,s=e),localStorage.setItem("trivia-category",s)}]}return new class extends Z{constructor(e){super(),X(this,e,Rt,Ot,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
