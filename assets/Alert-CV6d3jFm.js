import{k as O,m as t,s as F,x as V,c as E,r as N}from"./vue-yiQq_PH0.js";import{ai as q,aj as x,ak as i,al as T,am as D,an as K,ao as G,ap as J,aq as Q,ar as U,as as X,at as Y,au as Z,x as oo,av as eo,aw as ro,ax as H,ay as no,az as c,aA as so,aB as to}from"./index-BctytEVQ.js";import{j as f,n as u,f as lo}from"./naive-ui-CAwxRKuH.js";const io={iconMargin:"11px 8px 0 12px",iconMarginRtl:"11px 12px 0 8px",iconSize:"24px",closeIconSize:"16px",closeSize:"20px",closeMargin:"13px 14px 0 0",closeMarginRtl:"13px 0 0 14px",padding:"13px"};function ao(r){const{lineHeight:o,borderRadius:d,fontWeightStrong:b,baseColor:l,dividerColor:v,actionColor:y,textColor1:g,textColor2:s,closeColorHover:h,closeColorPressed:C,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:n,infoColor:e,successColor:I,warningColor:z,errorColor:S,fontSize:P}=r;return Object.assign(Object.assign({},io),{fontSize:P,lineHeight:o,titleFontWeight:b,borderRadius:d,border:`1px solid ${v}`,color:y,titleTextColor:g,iconColor:s,contentTextColor:s,closeBorderRadius:d,closeColorHover:h,closeColorPressed:C,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:n,borderInfo:`1px solid ${f(l,u(e,{alpha:.25}))}`,colorInfo:f(l,u(e,{alpha:.08})),titleTextColorInfo:g,iconColorInfo:e,contentTextColorInfo:s,closeColorHoverInfo:h,closeColorPressedInfo:C,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:n,borderSuccess:`1px solid ${f(l,u(I,{alpha:.25}))}`,colorSuccess:f(l,u(I,{alpha:.08})),titleTextColorSuccess:g,iconColorSuccess:I,contentTextColorSuccess:s,closeColorHoverSuccess:h,closeColorPressedSuccess:C,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:n,borderWarning:`1px solid ${f(l,u(z,{alpha:.33}))}`,colorWarning:f(l,u(z,{alpha:.08})),titleTextColorWarning:g,iconColorWarning:z,contentTextColorWarning:s,closeColorHoverWarning:h,closeColorPressedWarning:C,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:n,borderError:`1px solid ${f(l,u(S,{alpha:.25}))}`,colorError:f(l,u(S,{alpha:.08})),titleTextColorError:g,iconColorError:S,contentTextColorError:s,closeColorHoverError:h,closeColorPressedError:C,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:n})}const co={common:q,self:ao},go=x("alert",`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[i("border",`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),T("closable",[x("alert-body",[i("title",`
 padding-right: 24px;
 `)])]),i("icon",{color:"var(--n-icon-color)"}),x("alert-body",{padding:"var(--n-padding)"},[i("title",{color:"var(--n-title-text-color)"}),i("content",{color:"var(--n-content-text-color)"})]),D({originalTransition:"transform .3s var(--n-bezier)",enterToProps:{transform:"scale(1)"},leaveToProps:{transform:"scale(0.9)"}}),i("icon",`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),i("close",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),T("show-icon",[x("alert-body",{paddingLeft:"calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))"})]),T("right-adjust",[x("alert-body",{paddingRight:"calc(var(--n-close-size) + var(--n-padding) + 2px)"})]),x("alert-body",`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[i("title",`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[K("& +",[i("content",{marginTop:"9px"})])]),i("content",{transition:"color .3s var(--n-bezier)",fontSize:"var(--n-font-size)"})]),i("icon",{transition:"color .3s var(--n-bezier)"})]),ho=Object.assign(Object.assign({},H.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:"default"},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),Co=O({name:"Alert",inheritAttrs:!1,props:ho,slots:Object,setup(r){V(()=>{r.onAfterHide!==void 0&&to("alert","`on-after-hide` is deprecated, please use `on-after-leave` instead.")});const{mergedClsPrefixRef:o,mergedBorderedRef:d,inlineThemeDisabled:b,mergedRtlRef:l}=ro(r),v=H("Alert","-alert",go,co,r,o),y=no("Alert",l,o),g=E(()=>{const{common:{cubicBezierEaseInOut:n},self:e}=v.value,{fontSize:I,borderRadius:z,titleFontWeight:S,lineHeight:P,iconSize:$,iconMargin:R,iconMarginRtl:w,closeIconSize:_,closeBorderRadius:A,closeSize:W,closeMargin:B,closeMarginRtl:j,padding:k}=e,{type:a}=r,{left:M,right:L}=lo(R);return{"--n-bezier":n,"--n-color":e[c("color",a)],"--n-close-icon-size":_,"--n-close-border-radius":A,"--n-close-color-hover":e[c("closeColorHover",a)],"--n-close-color-pressed":e[c("closeColorPressed",a)],"--n-close-icon-color":e[c("closeIconColor",a)],"--n-close-icon-color-hover":e[c("closeIconColorHover",a)],"--n-close-icon-color-pressed":e[c("closeIconColorPressed",a)],"--n-icon-color":e[c("iconColor",a)],"--n-border":e[c("border",a)],"--n-title-text-color":e[c("titleTextColor",a)],"--n-content-text-color":e[c("contentTextColor",a)],"--n-line-height":P,"--n-border-radius":z,"--n-font-size":I,"--n-title-font-weight":S,"--n-icon-size":$,"--n-icon-margin":R,"--n-icon-margin-rtl":w,"--n-close-size":W,"--n-close-margin":B,"--n-close-margin-rtl":j,"--n-padding":k,"--n-icon-margin-left":M,"--n-icon-margin-right":L}}),s=b?so("alert",E(()=>r.type[0]),g,r):void 0,h=N(!0),C=()=>{const{onAfterLeave:n,onAfterHide:e}=r;n&&n(),e&&e()};return{rtlEnabled:y,mergedClsPrefix:o,mergedBordered:d,visible:h,handleCloseClick:()=>{var n;Promise.resolve((n=r.onClose)===null||n===void 0?void 0:n.call(r)).then(e=>{e!==!1&&(h.value=!1)})},handleAfterLeave:()=>{C()},mergedTheme:v,cssVars:b?void 0:g,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender}},render(){var r;return(r=this.onRender)===null||r===void 0||r.call(this),t(eo,{onAfterLeave:this.handleAfterLeave},{default:()=>{const{mergedClsPrefix:o,$slots:d}=this,b={class:[`${o}-alert`,this.themeClass,this.closable&&`${o}-alert--closable`,this.showIcon&&`${o}-alert--show-icon`,!this.title&&this.closable&&`${o}-alert--right-adjust`,this.rtlEnabled&&`${o}-alert--rtl`],style:this.cssVars,role:"alert"};return this.visible?t("div",Object.assign({},F(this.$attrs,b)),this.closable&&t(G,{clsPrefix:o,class:`${o}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&t("div",{class:`${o}-alert__border`}),this.showIcon&&t("div",{class:`${o}-alert__icon`,"aria-hidden":"true"},J(d.icon,()=>[t(Q,{clsPrefix:o},{default:()=>{switch(this.type){case"success":return t(Z,null);case"info":return t(Y,null);case"warning":return t(X,null);case"error":return t(U,null);default:return null}}})])),t("div",{class:[`${o}-alert-body`,this.mergedBordered&&`${o}-alert-body--bordered`]},oo(d.header,l=>{const v=l||this.title;return v?t("div",{class:`${o}-alert-body__title`},v):null}),d.default&&t("div",{class:`${o}-alert-body__content`},d))):null}})}});export{Co as _};
