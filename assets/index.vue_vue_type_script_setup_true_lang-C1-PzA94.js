import{d as H,v as J,a as K,u as Q,i as T,c as N,o as W,r as _,b as i,e as m,w as e,f as s,l as a,x as f,y as p,m as x,p as I,F,n as X,z as Y,g as r,t as h}from"./index-DMJecOpv.js";import{g as S}from"./country-flag-url-BQk2iSYf.js";/* empty css                                                  */import{_ as Z}from"./AppFooter.vue_vue_type_script_setup_true_lang-CK3kgg1-.js";import{_ as ee}from"./Progress.vue_vue_type_script_setup_true_lang-Dbr9rtb5.js";const ae=r("span",null,"Please fill in your contact details:",-1),te=r("span",{class:"b7 gray-9"},"First Name",-1),le=r("span",{class:"b7 gray-9"},"First Name",-1),se=r("span",{class:"b7 gray-9 p-0"},"Last Name",-1),ne=r("span",{class:"b7 gray-9 p-0"},"Last Name",-1),oe=r("span",{class:"b7 gray-9 p-0"},"Contact Number",-1),de=["src"],ie=["src"],me=r("span",{class:"b7 gray-8"}," I confirm that the above information is accurate and I have read and understood the requirements and expectations of entering the Silicon Stack premises. ",-1),re=r("span",{class:"b7 gray-8"}," I confirm that the above information is accurate and I have read and understood the requirements and expectations of entering the Silicon Stack premises. ",-1),ge=H({__name:"index",setup(ue){const U={firstName:"required|noSpecialCharacters|min:2|max:20",lastName:"required|noSpecialCharacters|min:2|max:20",dialingCode:"required",contactNumber:"required|contactNumber"},{validate:L}=J(),R=K(),q=Q(),l=T(),v=N(()=>q.$state.countries),B=N(()=>{const{firstName:d,lastName:n,dialingCode:u,contactNumber:g,isInfoConfirmed:c}=l.$state;return!!d&&!!n&&!!u&&!!g&&!!c}),D=N(()=>!l.$state.isReviewed);W(()=>{l.handleChange("isReviewed",!1)});const j=d=>{const n=d.target.value;l.handleChange("firstName",n)},z=d=>{const n=d.target.value;l.handleChange("lastName",n)},P=d=>{const n=d.target.value;l.handleChange("contactNumber",n)},E=d=>{l.handleChange("dialingCode",d)},M=d=>{l.handleChange("isInfoConfirmed",d)},O=async()=>{try{const{valid:d}=await L();d&&R.push({name:"successfully"})}catch(d){console.error(d)}};return(d,n)=>{const u=_("a-flex"),g=_("a-input"),c=_("a-form-item"),$=_("a-select-option"),k=_("a-select"),y=_("a-col"),A=_("a-row"),V=_("a-checkbox"),w=_("a-form");return i(),m(u,{class:"office-guidelines",vertical:""},{default:e(()=>[s(a(ee),{title:"3. Contact Information",description:"Final Step",currentStep:3,"total-steps":3}),s(a(Y),{"validation-schema":U},{default:e(({errors:b,handleSubmit:G})=>[s(w,{onSubmit:t=>G(O)},{default:e(()=>[s(u,{class:"px-4 py-6",gap:"middle",vertical:""},{default:e(()=>[s(u,{class:"b6 gray-9"},{default:e(()=>[ae]),_:1}),s(w,{style:{background:"#f6f6fa"},class:"p-4","label-col":{span:24}},{default:e(()=>[s(u,{gap:"middle",vertical:""},{default:e(()=>[a(l).$state.isReviewed?(i(),m(a(f),{key:1,modelValue:a(l).$state.firstName,"onUpdate:modelValue":n[1]||(n[1]=t=>a(l).$state.firstName=t),label:"First Name",id:"firstName",name:"firstName"},{default:e(({field:t})=>[s(c,{class:"mb-0"},{label:e(()=>[le]),default:e(()=>[s(g,p(t,{placeholder:"First Name",autocomplete:"off",disabled:""}),null,16)]),_:2},1024)]),_:1},8,["modelValue"])):(i(),m(a(f),{key:0,modelValue:a(l).$state.firstName,"onUpdate:modelValue":n[0]||(n[0]=t=>a(l).$state.firstName=t),label:"First Name",id:"firstName",name:"firstName",onChange:j},{default:e(({field:t,value:o})=>[s(c,{class:"mb-0","has-feedback":"","validate-status":b.firstName?"error":o?"success":"",help:b.firstName},{label:e(()=>[te]),default:e(()=>[s(g,p(t,{placeholder:"First Name",autocomplete:"off"}),null,16)]),_:2},1032,["validate-status","help"])]),_:2},1032,["modelValue"])),a(l).$state.isReviewed?(i(),m(a(f),{key:3,modelValue:a(l).$state.lastName,"onUpdate:modelValue":n[3]||(n[3]=t=>a(l).$state.lastName=t),label:"Last Name",id:"lastName",name:"lastName"},{default:e(({field:t})=>[s(c,{class:"mb-0"},{label:e(()=>[ne]),default:e(()=>[s(g,p(t,{placeholder:"Last Name",disabled:""}),null,16)]),_:2},1024)]),_:1},8,["modelValue"])):(i(),m(a(f),{key:2,modelValue:a(l).$state.lastName,"onUpdate:modelValue":n[2]||(n[2]=t=>a(l).$state.lastName=t),label:"Last Name",id:"lastName",name:"lastName",onChange:z},{default:e(({field:t,value:o})=>[s(c,{class:"mb-0","has-feedback":"","validate-status":b.lastName?"error":o?"success":"",help:b.lastName},{label:e(()=>[se]),default:e(()=>[s(g,p(t,{placeholder:"Last Name"}),null,16)]),_:2},1032,["validate-status","help"])]),_:2},1032,["modelValue"])),s(c,{class:"mb-0"},{label:e(()=>[oe]),default:e(()=>[s(A,{gutter:[6,4]},{default:e(()=>[s(y,null,{default:e(()=>[a(l).$state.isReviewed?(i(),m(a(f),{key:1,modelValue:a(l).$state.dialingCode,"onUpdate:modelValue":n[6]||(n[6]=t=>a(l).$state.dialingCode=t),label:"Dialing Code",id:"dialingCode",name:"dialingCode"},{default:e(({field:t})=>[s(k,p(t,{"dropdown-match-select-width":!1,"option-label-prop":"label",disabled:""}),{default:e(()=>[(i(!0),x(F,null,I(v.value,o=>(i(),m($,{value:o.dialingCode,label:o.dialingCode,key:o.dialingCode},{default:e(()=>[s(u,{class:"py-4",align:"center"},{default:e(()=>[r("span",null,"("+h(o.dialingCode)+")",1),r("img",{style:{width:"38px",height:"24px","object-fit":"cover"},class:"mx-2",src:a(S)(o.code),alt:"Country Flag"},null,8,ie),r("span",null,h(o.name),1)]),_:2},1024)]),_:2},1032,["value","label"]))),128))]),_:2},1040)]),_:1},8,["modelValue"])):(i(),m(a(f),{key:0,modelValue:a(l).$state.dialingCode,"onUpdate:modelValue":n[4]||(n[4]=t=>a(l).$state.dialingCode=t),label:"Dialing Code",id:"dialingCode",name:"dialingCode",onChange:n[5]||(n[5]=t=>E(a(l).$state.dialingCode))},{default:e(({field:t,value:o})=>[s(k,p(t,{"dropdown-match-select-width":!1,"option-label-prop":"label","has-feedback":"","validate-status":b.dialingCode?"error":o?"success":"",help:b.dialingCode}),{default:e(()=>[(i(!0),x(F,null,I(v.value,C=>(i(),m($,{value:C.dialingCode,label:C.dialingCode,key:C.dialingCode},{default:e(()=>[s(u,{class:"py-4",align:"center"},{default:e(()=>[r("span",null,"("+h(C.dialingCode)+")",1),r("img",{style:{width:"38px",height:"24px","object-fit":"cover"},class:"mx-2",src:a(S)(C.code),alt:"Country Flag"},null,8,de),r("span",null,h(C.name),1)]),_:2},1024)]),_:2},1032,["value","label"]))),128))]),_:2},1040,["validate-status","help"])]),_:2},1032,["modelValue"]))]),_:2},1024),s(y,{flex:"1 1 150px"},{default:e(()=>[a(l).$state.isReviewed?(i(),m(a(f),{key:1,modelValue:a(l).$state.contactNumber,"onUpdate:modelValue":n[8]||(n[8]=t=>a(l).$state.contactNumber=t),label:"Contact Number",id:"contactNumber",name:"contactNumber"},{default:e(({field:t})=>[s(c,{class:"mb-0"},{default:e(()=>[s(g,p(t,{placeholder:"Contact Number",disabled:""}),null,16)]),_:2},1024)]),_:1},8,["modelValue"])):(i(),m(a(f),{key:0,modelValue:a(l).$state.contactNumber,"onUpdate:modelValue":n[7]||(n[7]=t=>a(l).$state.contactNumber=t),label:"Contact Number",id:"contactNumber",name:"contactNumber",onChange:P},{default:e(({field:t,value:o})=>[s(c,{class:"mb-0","has-feedback":"","validate-status":b.contactNumber?"error":o?"success":"",help:b.contactNumber},{default:e(()=>[s(g,p(t,{placeholder:"Contact Number"}),null,16)]),_:2},1032,["validate-status","help"])]),_:2},1032,["modelValue"]))]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024),s(u,{vertical:""},{default:e(()=>[a(l).$state.isReviewed?(i(),m(a(f),{key:1,label:"Inforconfirm",id:"isInfoConfirmed",name:"isInfoConfirmed"},{default:e(({field:t})=>[s(c,{class:"pt-6 mb-0",name:"remember"},{default:e(()=>[s(u,null,{default:e(()=>[s(V,p(t,{checked:a(l).$state.isInfoConfirmed,"onUpdate:checked":n[11]||(n[11]=o=>a(l).$state.isInfoConfirmed=o),size:[24,24],disabled:""}),{default:e(()=>[re]),_:2},1040,["checked"])]),_:2},1024)]),_:2},1024)]),_:1})):(i(),m(a(f),{key:0,label:"Inforconfirm",id:"isInfoConfirmed",name:"isInfoConfirmed",onChange:n[10]||(n[10]=t=>M(a(l).$state.isInfoConfirmed))},{default:e(({field:t})=>[s(c,{class:"pt-6 mb-0",name:"remember"},{default:e(()=>[s(u,null,{default:e(()=>[s(V,p(t,{checked:a(l).$state.isInfoConfirmed,"onUpdate:checked":n[9]||(n[9]=o=>a(l).$state.isInfoConfirmed=o),size:[24,24]}),{default:e(()=>[me]),_:2},1040,["checked"])]),_:2},1024)]),_:2},1024)]),_:1}))]),_:1})]),_:2},1024)]),_:2},1024),D.value?(i(),m(a(Z),{key:0,backRouteName:"health-checklist",type:"submit",canSubmit:B.value&&!Object.keys(b).length},null,8,["canSubmit"])):X("",!0)]),_:2},1032,["onSubmit"])]),_:1})]),_:1})}}});export{ge as _};
