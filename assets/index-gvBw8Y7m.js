import{d as F,f as I,e as U,h as p,o as l,c as m,w as o,r as y,a as s,l as r,F as u,m as f,k as d,n as V,p as w,b as i,q as P,t as g}from"./index-BgfvC7zE.js";import"./AppFooter.vue_vue_type_style_index_0_lang-CG3B890Q.js";import{_ as R}from"./AppFooter.vue_vue_type_script_setup_true_lang-CWizDkxf.js";const T=i("h5",{class:"h5 primary-9"}," To begin, please select your country and facility location ",-1),E=i("span",{class:"b6 gray-9"},"Select your country:",-1),L=["onClick"],j=["src"],q={class:"b8 pt-1 text-center"},z=i("span",{class:"b6 gray-9"}," Select the facility you are entering: ",-1),A={class:"location__body-facility-content b6 gray-10 ps-2"},D=i("span",{class:"b6 gray-9"},"Select the status:",-1),G={class:"location__body-facility-content b6 gray-10 ps-2"},Q=F({__name:"index",setup(H){const h=[{code:"visitor",label:"Visitor"},{code:"employee",label:"Employee"}],k=I(),n=U(),x={backRouteName:"intro",nextRouteName:"office-guidelines"},_=p(()=>k.$state.countries),v=p(()=>{const{countryCode:c}=n.$state,t=_.value.find(a=>a.code===c);return t?t.facilityList:[]}),$=p(()=>{const{countryCode:c,facilityId:t,statusCode:a}=n.$state;return!!c&&!!t&&!!a}),N=c=>`/src/assets/images/location/${c}.svg`,S=c=>{n.onChange("countryCode",c);const t=v.value[0];t&&n.onChange("facilityId",t.id)};return(c,t)=>{const a=y("a-flex"),B=y("a-empty"),b=y("a-radio"),C=y("a-radio-group");return l(),m(a,{class:"location",justify:"space-between",gap:"large",vertical:""},{default:o(()=>[s(a,{class:"location__body",gap:"middle",vertical:""},{default:o(()=>[s(a,{class:"location__body-country px-4",gap:"middle",vertical:""},{default:o(()=>[T,_.value.length?(l(),r(u,{key:0},[E,s(a,{class:"location__body-country-choice",gap:"middle"},{default:o(()=>[(l(!0),r(u,null,f(_.value,e=>(l(),r("div",{class:P(["location__body-country-item px-4 pt-4 pb-2",{"location__body-country-item--active":e.code===d(n).$state.countryCode}]),key:e.id,onClick:J=>S(e.code)},[i("img",{class:"country-item__img",src:N(e.code),alt:"Country Flag"},null,8,j),i("div",q,g(e.name),1)],10,L))),128))]),_:1})],64)):(l(),m(B,{key:1,description:"No countries found!"}))]),_:1}),_.value.length?(l(),r(u,{key:0},[s(a,{class:"location__body-facility p-4",gap:"middle",vertical:""},{default:o(()=>[z,s(C,{class:"location__body-facility-options",value:d(n).$state.facilityId,"onUpdate:value":t[0]||(t[0]=e=>d(n).$state.facilityId=e)},{default:o(()=>[s(a,{gap:"middle",vertical:""},{default:o(()=>[(l(!0),r(u,null,f(v.value,e=>(l(),m(b,{value:e.id,key:e.id},{default:o(()=>[i("span",A,g(e.name),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1},8,["value"])]),_:1}),s(a,{class:"location__body-status p-4",gap:"middle",vertical:""},{default:o(()=>[D,s(C,{class:"location__body-status-options",value:d(n).$state.statusCode,"onUpdate:value":t[1]||(t[1]=e=>d(n).$state.statusCode=e)},{default:o(()=>[s(a,{gap:"middle",vertical:""},{default:o(()=>[(l(),r(u,null,f(h,e=>s(b,{value:e.code,key:e.code},{default:o(()=>[i("span",G,g(e.label),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1},8,["value"])]),_:1})],64)):V("",!0)]),_:1}),s(d(R),w(x,{canNext:$.value}),null,16,["canNext"])]),_:1})}}});export{Q as default};