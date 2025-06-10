import{k as C,m as a,c}from"./vue-yiQq_PH0.js";import{aj as $,al as i,aw as z,ax as h,az as B,aA as T,aH as _,aI as R}from"./index-DF_Y0CEI.js";import{t as S}from"./p-Bg4XS86s.js";const w=$("text",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[i("strong",`
 font-weight: var(--n-font-weight-strong);
 `),i("italic",{fontStyle:"italic"}),i("underline",{textDecoration:"underline"}),i("code",`
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]),V=Object.assign(Object.assign({},h.props),{code:Boolean,type:{type:String,default:"default"},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>(R("text","`as` is deprecated, please use `tag` instead."),!0),default:void 0}}),D=C({name:"Text",props:V,setup(e){const{mergedClsPrefixRef:r,inlineThemeDisabled:s}=z(e),o=h("Typography","-text",w,S,e,r),n=c(()=>{const{depth:l,type:d}=e,u=d==="default"?l===void 0?"textColor":`textColor${l}Depth`:B("textColor",d),{common:{fontWeightStrong:m,fontFamilyMono:g,cubicBezierEaseInOut:x},self:{codeTextColor:f,codeBorderRadius:b,codeColor:v,codeBorder:p,[u]:y}}=o.value;return{"--n-bezier":x,"--n-text-color":y,"--n-font-weight-strong":m,"--n-font-famliy-mono":g,"--n-code-border-radius":b,"--n-code-text-color":f,"--n-code-color":v,"--n-code-border":p}}),t=s?T("text",c(()=>`${e.type[0]}${e.depth||""}`),n,e):void 0;return{mergedClsPrefix:r,compitableTag:_(e,["as","tag"]),cssVars:s?void 0:n,themeClass:t==null?void 0:t.themeClass,onRender:t==null?void 0:t.onRender}},render(){var e,r,s;const{mergedClsPrefix:o}=this;(e=this.onRender)===null||e===void 0||e.call(this);const n=[`${o}-text`,this.themeClass,{[`${o}-text--code`]:this.code,[`${o}-text--delete`]:this.delete,[`${o}-text--strong`]:this.strong,[`${o}-text--italic`]:this.italic,[`${o}-text--underline`]:this.underline}],t=(s=(r=this.$slots).default)===null||s===void 0?void 0:s.call(r);return this.code?a("code",{class:n,style:this.cssVars},this.delete?a("del",null,t):t):this.delete?a("del",{class:n,style:this.cssVars},t):a(this.compitableTag||"span",{class:n,style:this.cssVars},t)}});export{D as _};
