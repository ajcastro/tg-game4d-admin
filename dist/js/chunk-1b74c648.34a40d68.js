(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b74c648"],{"01e3":function(n,t,e){"use strict";e.d(t,"a",(function(){return d}));var r=e("2b0e"),a=e("b42e"),o=e("c637"),s=e("a723"),c=e("9b76"),i=e("365c"),l=e("cf75");function p(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var u=Object(l["d"])({label:Object(l["c"])(s["u"]),role:Object(l["c"])(s["u"],"status"),small:Object(l["c"])(s["g"],!1),tag:Object(l["c"])(s["u"],"span"),type:Object(l["c"])(s["u"],"border"),variant:Object(l["c"])(s["u"])},o["Qb"]),d=r["default"].extend({name:o["Qb"],functional:!0,props:u,render:function(n,t){var e,r=t.props,o=t.data,s=t.slots,l=t.scopedSlots,u=s(),d=l||{},b=Object(i["b"])(c["C"],{},d,u)||r.label;return b&&(b=n("span",{staticClass:"sr-only"},b)),n(r.tag,Object(a["a"])(o,{attrs:{role:b?r.role||"status":null,"aria-hidden":b?null:"true"},class:(e={},p(e,"spinner-".concat(r.type),r.type),p(e,"spinner-".concat(r.type,"-sm"),r.small),p(e,"text-".concat(r.variant),r.variant),e)}),[b||n()])}})},1079:function(n,t,e){"use strict";var r=e("541c");t["a"]=r["a"]},a15b7:function(n,t,e){"use strict";e.d(t,"a",(function(){return h}));var r=e("b42e"),a=e("c637"),o=e("a723"),s=e("2326"),c=e("228e"),i=e("6c06"),l=e("b508"),p=e("d82f"),u=e("cf75"),d=e("fa73");function b(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function f(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?b(Object(e),!0).forEach((function(t){m(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):b(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function m(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var v=["start","end","center"],g=Object(l["a"])((function(n,t){return t=Object(d["h"])(Object(d["g"])(t)),t?Object(d["c"])(["row-cols",n,t].filter(i["a"]).join("-")):null})),O=Object(l["a"])((function(n){return Object(d["c"])(n.replace("cols",""))})),y=[],j=function(){var n=Object(c["b"])().reduce((function(n,t){return n[Object(u["g"])(t,"cols")]=Object(u["c"])(o["p"]),n}),Object(p["c"])(null));return y=Object(p["h"])(n),Object(u["d"])(Object(p["m"])(f(f({},n),{},{alignContent:Object(u["c"])(o["u"],null,(function(n){return Object(s["a"])(Object(s["b"])(v,"between","around","stretch"),n)})),alignH:Object(u["c"])(o["u"],null,(function(n){return Object(s["a"])(Object(s["b"])(v,"between","around"),n)})),alignV:Object(u["c"])(o["u"],null,(function(n){return Object(s["a"])(Object(s["b"])(v,"baseline","stretch"),n)})),noGutters:Object(u["c"])(o["g"],!1),tag:Object(u["c"])(o["u"],"div")})),a["Ob"])},h={name:a["Ob"],functional:!0,get props(){return delete this.props,this.props=j(),this.props},render:function(n,t){var e,a=t.props,o=t.data,s=t.children,c=a.alignV,i=a.alignH,l=a.alignContent,p=[];return y.forEach((function(n){var t=g(O(n),a[n]);t&&p.push(t)})),p.push((e={"no-gutters":a.noGutters},m(e,"align-items-".concat(c),c),m(e,"justify-content-".concat(i),i),m(e,"align-content-".concat(l),l),e)),n(a.tag,Object(r["a"])(o,{staticClass:"row",class:p}),s)}}},b28b:function(n,t,e){"use strict";e.d(t,"a",(function(){return x}));var r=e("b42e"),a=e("c637"),o=e("a723"),s=e("992e"),c=e("2326"),i=e("228e"),l=e("6c06"),p=e("7b1e"),u=e("b508"),d=e("d82f"),b=e("cf75"),f=e("fa73");function m(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function v(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?m(Object(e),!0).forEach((function(t){g(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):m(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function g(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var O=["auto","start","end","center","baseline","stretch"],y=function(n,t,e){var r=n;if(!Object(p["p"])(e)&&!1!==e)return t&&(r+="-".concat(t)),"col"!==n||""!==e&&!0!==e?(r+="-".concat(e),Object(f["c"])(r)):Object(f["c"])(r)},j=Object(u["a"])(y),h=Object(d["c"])(null),_=function(){var n=Object(i["b"])().filter(l["a"]),t=n.reduce((function(n,t){return n[t]=Object(b["c"])(o["i"]),n}),Object(d["c"])(null)),e=n.reduce((function(n,t){return n[Object(b["g"])(t,"offset")]=Object(b["c"])(o["p"]),n}),Object(d["c"])(null)),r=n.reduce((function(n,t){return n[Object(b["g"])(t,"order")]=Object(b["c"])(o["p"]),n}),Object(d["c"])(null));return h=Object(d["a"])(Object(d["c"])(null),{col:Object(d["h"])(t),offset:Object(d["h"])(e),order:Object(d["h"])(r)}),Object(b["d"])(Object(d["m"])(v(v(v(v({},t),e),r),{},{alignSelf:Object(b["c"])(o["u"],null,(function(n){return Object(c["a"])(O,n)})),col:Object(b["c"])(o["g"],!1),cols:Object(b["c"])(o["p"]),offset:Object(b["c"])(o["p"]),order:Object(b["c"])(o["p"]),tag:Object(b["c"])(o["u"],"div")})),a["y"])},x={name:a["y"],functional:!0,get props(){return delete this.props,this.props=_()},render:function(n,t){var e,a=t.props,o=t.data,c=t.children,i=a.cols,l=a.offset,p=a.order,u=a.alignSelf,d=[];for(var b in h)for(var f=h[b],m=0;m<f.length;m++){var v=j(b,f[m].replace(b,""),a[f[m]]);v&&d.push(v)}var O=d.some((function(n){return s["e"].test(n)}));return d.push((e={col:a.col||!O&&!i},g(e,"col-".concat(i),i),g(e,"offset-".concat(l),l),g(e,"order-".concat(p),p),g(e,"align-self-".concat(u),u),e)),n(a.tag,Object(r["a"])(o,{class:d}),c)}}},d6e4:function(n,t,e){"use strict";e.d(t,"a",(function(){return l}));var r=e("2b0e"),a=e("b42e"),o=e("c637"),s=e("a723"),c=e("cf75"),i=Object(c["d"])({textTag:Object(c["c"])(s["u"],"p")},o["u"]),l=r["default"].extend({name:o["u"],functional:!0,props:i,render:function(n,t){var e=t.props,r=t.data,o=t.children;return n(e.textTag,Object(a["a"])(r,{staticClass:"card-text"}),o)}})},f055:function(n,t,e){"use strict";e.r(t);var r=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("b-row",{staticClass:"match-height"},[e("b-col",{attrs:{md:"6"}},[e("spinner-border")],1),e("b-col",{attrs:{md:"6"}},[e("spinner-color")],1),e("b-col",{attrs:{md:"6"}},[e("spinner-grow")],1),e("b-col",{attrs:{md:"6"}},[e("spinner-grow-color")],1),e("b-col",{attrs:{md:"6"}},[e("spinner-flex")],1),e("b-col",{attrs:{md:"6"}},[e("spinner-float")],1),e("b-col",{attrs:{md:"6"}},[e("spinner-text-align")],1),e("b-col",{attrs:{md:"6"}},[e("spinner-size")],1),e("b-col",[e("spinner-button")],1)],1)},a=[],o=e("a15b7"),s=e("b28b"),c=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("b-card-code",{attrs:{title:"Border Spinners"},scopedSlots:n._u([{key:"code",fn:function(){return[n._v(" "+n._s(n.codeBorder)+" ")]},proxy:!0}])},[e("b-card-text",[e("span",[n._v("Use the default ")]),e("code",[n._v("border")]),e("span",[n._v(" type spinners for a lightweight loading indicator.")])]),e("b-spinner",{attrs:{label:"Loading..."}})],1)},i=[],l=e("1079"),p=e("01e3"),u=e("d6e4"),d="\n<template>\n  <b-spinner label=\"Loading...\" />\n</template>\n\n<script>\nimport { BSpinner } from 'bootstrap-vue'\n\nexport default {\n  components: {\n    BSpinner,\n  },\n}\n<\/script>\n",b="\n<template>\n  <div class=\"demo-inline-spacing\">\n    <b-spinner\n      v-for=\"variant in variants\"\n      :key=\"variant\"\n      class=\"mr-1\"\n      :variant=\"variant\"\n    />\n  </div>\n</template>\n\n<script>\nimport { BSpinner } from 'bootstrap-vue'\n\nexport default {\n  components: {\n    BSpinner,\n  },\n  data: () => ({\n    variants: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark'],\n  }),\n}\n<\/script>\n",f='\n<template>\n  <div>\n    <b-button\n      variant="primary"\n      disabled\n      class="mr-1"\n    >\n      <b-spinner small />\n      <span class="sr-only">Loading...</span>\n    </b-button>\n\n    <b-button\n      variant="primary"\n      disabled\n      class="mr-1"\n    >\n      <b-spinner small />\n      Loading...\n    </b-button>\n\n    <b-button\n      variant="primary"\n      disabled\n      class="mr-1"\n    >\n      <b-spinner\n        small\n        type="grow"\n      />\n      <span class="sr-only">Loading...</span>\n    </b-button>\n\n    <b-button\n      variant="primary"\n      disabled\n      class="mr-1"\n    >\n      <b-spinner\n        small\n        type="grow"\n      />\n      Loading...\n    </b-button>\n  </div>\n</template>\n\n<script>\nimport { BSpinner, BButton } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BButton,\n    BSpinner,\n  },\n}\n<\/script>\n',m='\n<template>\n  <div>\n    <div class="d-flex justify-content-center mb-1">\n      <b-spinner label="Loading..." />\n    </div>\n    <div class="d-flex align-items-center">\n      <strong>Loading...</strong>\n      <b-spinner class="ml-auto" />\n    </div>\n  </div>\n</template>\n\n<script>\nimport { BSpinner } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BSpinner,\n  },\n}\n<\/script>\n',v='\n<template>\n  <div class="clearfix">\n    <b-spinner class="float-right" label="Floated Right" />\n  </div>\n</template>\n\n<script>\nimport { BSpinner } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BSpinner,\n  },\n}\n<\/script>\n',g='\n<template>\n  <b-spinner type="grow" label="Loading..." />\n</template>\n\n<script>\nimport { BSpinner } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BSpinner,\n  },\n}\n<\/script>\n',O="\n<template>\n  <div class=\"d-flex flex-wrap\">\n    <b-spinner\n      v-for=\"variant in variants\"\n      :key=\"variant\"\n      :variant=\"variant\"\n      class=\"mr-1\"\n      type=\"grow\"\n    />\n  </div>\n</template>\n\n<script>\nimport { BSpinner } from 'bootstrap-vue'\n\nexport default {\n  components: {\n    BCardCode,\n    BSpinner,\n  },\n  data: () => ({\n    variants: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark'],\n  }),\n}\n<\/script>\n",y='\n<template>\n  <div class="text-center d-flex justify-content-between">\n    <div>\n      <b-spinner\n        small\n        class="mr-1"\n        label="Small Spinner"\n      />\n      <b-spinner\n        small\n        label="Small Spinner"\n        type="grow"\n      />\n    </div>\n    <div>\n      <b-spinner\n        class="mr-1"\n        label="Small Spinner"\n      />\n      <b-spinner\n        label="Small Spinner"\n        type="grow"\n      />\n    </div>\n    <div>\n      <b-spinner\n        style="width: 3rem; height: 3rem;"\n        class="mr-1"\n        label="Large Spinner"\n      />\n      <b-spinner\n        style="width: 3rem; height: 3rem;"\n        label="Large Spinner"\n        type="grow"\n      />\n    </div>\n  </div>\n</template>\n\n<script>\nimport { BSpinner } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BSpinner,\n  },\n}\n<\/script>\n',j='\n<template>\n  <div class="text-center">\n    <b-spinner variant="primary" label="Text Centered" />\n  </div>\n</template>\n\n<script>\nimport { BSpinner } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BSpinner,\n  }\n}\n<\/script>\n',h={components:{BCardCode:l["a"],BSpinner:p["a"],BCardText:u["a"]},data:function(){return{codeBorder:d}}},_=h,x=e("2877"),S=Object(x["a"])(_,c,i,!1,null,null,null),w=S.exports,C=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("b-card-code",{attrs:{title:"Colored Spinners"},scopedSlots:n._u([{key:"code",fn:function(){return[n._v(" "+n._s(n.codeBorderColor)+" ")]},proxy:!0}])},[e("b-card-text",{staticClass:"mb-0"},[e("span",[n._v("You can customize the color using the standard text color variants using the ")]),e("code",[n._v("variant")]),e("span",[n._v(" prop.")])]),e("div",{staticClass:"demo-inline-spacing"},n._l(n.variants,(function(n){return e("b-spinner",{key:n,staticClass:"mr-1",attrs:{variant:n}})})),1)],1)},B=[],k={components:{BCardCode:l["a"],BSpinner:p["a"],BCardText:u["a"]},data:function(){return{variants:["primary","secondary","danger","warning","success","info","light","dark"],codeBorderColor:b}}},L=k,P=Object(x["a"])(L,C,B,!1,null,null,null),T=P.exports,E=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("b-card-code",{attrs:{title:"Growing Spinner"},scopedSlots:n._u([{key:"code",fn:function(){return[n._v(" "+n._s(n.codeGrow)+" ")]},proxy:!0}])},[e("b-card-text",[e("span",[n._v("If you don't fancy a ")]),e("code",[n._v("border")]),e("span",[n._v(" spinner, switch to the ")]),e("code",[n._v("grow")]),e("span",[n._v(" spinner by setting the prop ")]),e("code",[n._v("type")]),e("span",[n._v(" to ")]),e("code",[n._v("'grow'")]),n._v(". "),e("span",[n._v("While it doesn't technically spin, it does repeatedly grow!")])]),e("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1)},F=[],G={components:{BCardCode:l["a"],BSpinner:p["a"],BCardText:u["a"]},data:function(){return{codeGrow:g}}},$=G,D=Object(x["a"])($,E,F,!1,null,null,null),z=D.exports,U=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("b-card-code",{attrs:{title:"Colored Growing Spinners"},scopedSlots:n._u([{key:"code",fn:function(){return[n._v(" "+n._s(n.codeGrowColor)+" ")]},proxy:!0}])},[e("b-card-text",{staticClass:"mb-0"},[e("span",[n._v("The variant prop translates the variant name to the Bootstrap v4 class ")]),e("code",[n._v(".text-{variant}")]),e("span",[n._v(", so if you have custom defined text color ")]),e("code",[n._v("variants")]),e("span",[n._v(", feel free to use them via the variant prop.")])]),e("div",{staticClass:"demo-inline-spacing"},n._l(n.variants,(function(n){return e("b-spinner",{key:n,staticClass:"mr-1",attrs:{variant:n,type:"grow"}})})),1)],1)},A=[],R={components:{BCardCode:l["a"],BSpinner:p["a"],BCardText:u["a"]},data:function(){return{variants:["primary","secondary","danger","warning","success","info","light","dark"],codeGrowColor:O}}},H=R,J=Object(x["a"])(H,U,A,!1,null,null,null),Q=J.exports,V=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("b-card-code",{attrs:{title:"Sizes"},scopedSlots:n._u([{key:"code",fn:function(){return[n._v(" "+n._s(n.codeSize)+" ")]},proxy:!0}])},[e("b-card-text",{staticClass:"mb-0"},[e("span",[n._v("Set the prop ")]),e("code",[n._v("small")]),e("span",[n._v(" to ")]),e("code",[n._v("true")]),e("span",[n._v(" to make a smaller spinner that can quickly be used within other components.")])]),e("div",{staticClass:"demo-inline-spacing"},[e("div",[e("b-spinner",{staticClass:"mr-1",attrs:{small:"",label:"Small Spinner"}}),e("b-spinner",{attrs:{small:"",label:"Small Spinner",type:"grow"}})],1),e("div",[e("b-spinner",{staticClass:"mr-1",attrs:{label:"Small Spinner"}}),e("b-spinner",{attrs:{label:"Small Spinner",type:"grow"}})],1),e("div",[e("b-spinner",{staticClass:"mr-1",staticStyle:{width:"3rem",height:"3rem"},attrs:{label:"Large Spinner"}}),e("b-spinner",{staticStyle:{width:"3rem",height:"3rem"},attrs:{label:"Large Spinner",type:"grow"}})],1)])],1)},Y=[],q={components:{BCardCode:l["a"],BSpinner:p["a"],BCardText:u["a"]},data:function(){return{codeSize:y}}},I=q,W=Object(x["a"])(I,V,Y,!1,null,null,null),K=W.exports,M=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("b-card-code",{attrs:{title:"Flex"},scopedSlots:n._u([{key:"code",fn:function(){return[n._v(" "+n._s(n.codeFlex)+" ")]},proxy:!0}])},[e("b-card-text",[n._v(" Using flex utility classes: ")]),e("div",{staticClass:"d-flex justify-content-center mb-1"},[e("b-spinner",{attrs:{label:"Loading..."}})],1),e("div",{staticClass:"d-flex align-items-center"},[e("strong",[n._v("Loading...")]),e("b-spinner",{staticClass:"ml-auto"})],1)],1)},N=[],X={components:{BCardCode:l["a"],BSpinner:p["a"],BCardText:u["a"]},data:function(){return{codeFlex:m}}},Z=X,nn=Object(x["a"])(Z,M,N,!1,null,null,null),tn=nn.exports,en=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("b-card-code",{attrs:{title:"Float"},scopedSlots:n._u([{key:"code",fn:function(){return[n._v(" "+n._s(n.codeFloat)+" ")]},proxy:!0}])},[e("b-card-text",[n._v("Using float utility classes:")]),e("div",{staticClass:"clearfix"},[e("b-spinner",{staticClass:"float-right",attrs:{label:"Floated Right"}})],1)],1)},rn=[],an={components:{BCardCode:l["a"],BSpinner:p["a"],BCardText:u["a"]},data:function(){return{codeFloat:v}}},on=an,sn=Object(x["a"])(on,en,rn,!1,null,null,null),cn=sn.exports,ln=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("b-card-code",{attrs:{title:"Text Alignment"},scopedSlots:n._u([{key:"code",fn:function(){return[n._v(" "+n._s(n.codeTextAlign)+" ")]},proxy:!0}])},[e("b-card-text",[n._v("Using text alignment utility classes:")]),e("div",{staticClass:"text-center"},[e("b-spinner",{attrs:{variant:"primary",label:"Text Centered"}})],1)],1)},pn=[],un={components:{BCardCode:l["a"],BSpinner:p["a"],BCardText:u["a"]},data:function(){return{codeTextAlign:j}}},dn=un,bn=Object(x["a"])(dn,ln,pn,!1,null,null,null),fn=bn.exports,mn=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("b-card-code",{attrs:{title:"Buttons"},scopedSlots:n._u([{key:"code",fn:function(){return[n._v(" "+n._s(n.codeButton)+" ")]},proxy:!0}])},[e("b-card-text",{staticClass:"mb-0"},[n._v(" Use spinners within buttons to indicate an action is currently processing or taking place. You may also swap the label text out of the spinner element and utilize button text as needed. ")]),e("div",{staticClass:"demo-inline-spacing"},[e("b-button",{attrs:{variant:"outline-primary",disabled:""}},[e("b-spinner",{attrs:{small:""}}),e("span",{staticClass:"sr-only"},[n._v("Loading...")])],1),e("b-button",{attrs:{variant:"outline-primary",disabled:""}},[e("b-spinner",{attrs:{small:""}}),n._v(" Loading... ")],1),e("b-button",{attrs:{variant:"outline-primary",disabled:""}},[e("b-spinner",{attrs:{small:"",type:"grow"}}),e("span",{staticClass:"sr-only"},[n._v("Loading...")])],1),e("b-button",{attrs:{variant:"outline-primary",disabled:""}},[e("b-spinner",{attrs:{small:"",type:"grow"}}),n._v(" Loading... ")],1)],1)],1)},vn=[],gn=e("1947"),On={components:{BCardCode:l["a"],BButton:gn["a"],BSpinner:p["a"],BCardText:u["a"]},data:function(){return{codeButton:f}}},yn=On,jn=Object(x["a"])(yn,mn,vn,!1,null,null,null),hn=jn.exports,_n={components:{BRow:o["a"],BCol:s["a"],SpinnerBorder:w,SpinnerColor:T,SpinnerGrow:z,SpinnerGrowColor:Q,SpinnerSize:K,SpinnerFlex:tn,SpinnerFloat:cn,SpinnerTextAlign:fn,SpinnerButton:hn}},xn=_n,Sn=Object(x["a"])(xn,r,a,!1,null,null,null);t["default"]=Sn.exports}}]);
//# sourceMappingURL=chunk-1b74c648.34a40d68.js.map