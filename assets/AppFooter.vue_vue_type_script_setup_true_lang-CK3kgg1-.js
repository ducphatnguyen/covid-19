import{d as g,i as f,a as N,r as l,b as i,e as r,w as e,f as t,g as p,q as u,M as h,E as k}from"./index-DMJecOpv.js";const C=p("span",{class:"b6 gray-8"},"Back",-1),S=g({__name:"AppFooter",props:{backRouteName:{},nextRouteName:{},canNext:{type:Boolean},canSubmit:{type:Boolean},isStep2Navigated:{type:Boolean},type:{}},setup(m){const a=m,d=f(),s=N(),b=()=>{a.backRouteName==="intro"?h.confirm({title:"Confirmation",icon:t(k),content:"The data will be cleared. Are you sure you want to back?",onOk:()=>{s.push({name:"intro"})},onCancel:()=>{},width:300}):s.push({name:a.backRouteName})},y=()=>{a.nextRouteName==="health-checklist"&&d.handleChange("isStep2Navigated",a.isStep2Navigated),s.push({name:a.nextRouteName})};return(o,x)=>{const n=l("a-button"),c=l("a-col"),_=l("a-row");return i(),r(_,{style:{margin:"0"},class:"footer p-4",gutter:[16]},{default:e(()=>[t(c,{span:12},{default:e(()=>[t(n,{class:"button-100",size:"large",onClick:b},{default:e(()=>[C]),_:1})]),_:1}),a.type!=="submit"?(i(),r(c,{key:0,span:12},{default:e(()=>[t(n,{class:"button-100",type:"primary",size:"large",disabled:!o.canNext,onClick:y},{default:e(()=>[p("span",{class:u(["b6 gray-1",{"gray-6":!o.canNext}])},"Next",2)]),_:1},8,["disabled"])]),_:1})):(i(),r(c,{key:1,span:12},{default:e(()=>[t(n,{class:"button-100",type:"primary",size:"large","html-type":"submit",disabled:!o.canSubmit},{default:e(()=>[p("span",{class:u(["b6 gray-1",{"gray-6":!o.canSubmit}])},"Submit",2)]),_:1},8,["disabled"])]),_:1}))]),_:1})}}});export{S as _};
