(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6049e87d"],{1079:function(t,a,n){"use strict";var e=n("541c");a["a"]=e["a"]},2616:function(t,a,n){"use strict";n.d(a,"a",(function(){return $}));var e=n("c637"),r=n("e863"),s=n("0056"),o=n("2326"),i=n("228e"),c=n("be29"),l=n("6c06"),v=n("7b1e"),p=n("3c21"),d=n("3a58"),u=n("d82f"),b=n("8df8");function g(t,a){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);a&&(e=e.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),n.push.apply(n,e)}return n}function f(t){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?g(Object(n),!0).forEach((function(a){m(t,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))}))}return t}function m(t,a,n){return a in t?Object.defineProperty(t,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[a]=n,t}var h="__BV_Tooltip__",_="hover focus",O={focus:!0,hover:!0,click:!0,blur:!0,manual:!0},j=/^html$/i,y=/^noninteractive$/i,x=/^nofade$/i,C=/^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/i,B=/^(window|viewport|scrollParent)$/i,A=/^d\d+$/i,w=/^ds\d+$/i,P=/^dh\d+$/i,I=/^o-?\d+$/i,S=/^v-.+$/i,k=/\s+/,T=function(t,a){var n={title:void 0,trigger:"",placement:"top",fallbackPlacement:"flip",container:!1,animation:!0,offset:0,id:null,html:!1,interactive:!0,disabled:!1,delay:Object(i["c"])(e["gc"],"delay",50),boundary:String(Object(i["c"])(e["gc"],"boundary","scrollParent")),boundaryPadding:Object(d["c"])(Object(i["c"])(e["gc"],"boundaryPadding",5),0),variant:Object(i["c"])(e["gc"],"variant"),customClass:Object(i["c"])(e["gc"],"customClass")};if(Object(v["n"])(t.value)||Object(v["h"])(t.value)||Object(v["f"])(t.value)?n.title=t.value:Object(v["k"])(t.value)&&(n=f(f({},n),t.value)),Object(v["o"])(n.title)){var r=a.data||{};n.title=r.attrs&&!Object(v["p"])(r.attrs.title)?r.attrs.title:void 0}Object(v["k"])(n.delay)||(n.delay={show:Object(d["c"])(n.delay,0),hide:Object(d["c"])(n.delay,0)}),t.arg&&(n.container="#".concat(t.arg)),Object(u["h"])(t.modifiers).forEach((function(t){if(j.test(t))n.html=!0;else if(y.test(t))n.interactive=!1;else if(x.test(t))n.animation=!1;else if(C.test(t))n.placement=t;else if(B.test(t))t="scrollparent"===t?"scrollParent":t,n.boundary=t;else if(A.test(t)){var a=Object(d["c"])(t.slice(1),0);n.delay.show=a,n.delay.hide=a}else w.test(t)?n.delay.show=Object(d["c"])(t.slice(2),0):P.test(t)?n.delay.hide=Object(d["c"])(t.slice(2),0):I.test(t)?n.offset=Object(d["c"])(t.slice(1),0):S.test(t)&&(n.variant=t.slice(2)||null)}));var s={};return Object(o["b"])(n.trigger||"").filter(l["a"]).join(" ").trim().toLowerCase().split(k).forEach((function(t){O[t]&&(s[t]=!0)})),Object(u["h"])(t.modifiers).forEach((function(t){t=t.toLowerCase(),O[t]&&(s[t]=!0)})),n.trigger=Object(u["h"])(s).join(" "),"blur"===n.trigger&&(n.trigger="focus"),n.trigger||(n.trigger=_),n},z=function(t,a,n){if(r["i"]){var e=T(a,n);if(!t[h]){var o=n.context;t[h]=new b["a"]({parent:o,_scopeId:Object(c["a"])(o,void 0)}),t[h].__bv_prev_data__={},t[h].$on(s["T"],(function(){Object(v["f"])(e.title)&&t[h].updateData({title:e.title(t)})}))}var i={title:e.title,triggers:e.trigger,placement:e.placement,fallbackPlacement:e.fallbackPlacement,variant:e.variant,customClass:e.customClass,container:e.container,boundary:e.boundary,delay:e.delay,offset:e.offset,noFade:!e.animation,id:e.id,interactive:e.interactive,disabled:e.disabled,html:e.html},l=t[h].__bv_prev_data__;if(t[h].__bv_prev_data__=i,!Object(p["a"])(i,l)){var d={target:t};Object(u["h"])(i).forEach((function(a){i[a]!==l[a]&&(d[a]="title"===a&&Object(v["f"])(i[a])?i[a](t):i[a])})),t[h].updateData(d)}}},E=function(t){t[h]&&(t[h].$destroy(),t[h]=null),delete t[h]},$={bind:function(t,a,n){z(t,a,n)},componentUpdated:function(t,a,n){n.context.$nextTick((function(){z(t,a,n)}))},unbind:function(t){E(t)}}},3985:function(t,a,n){"use strict";n.d(a,"a",(function(){return d}));var e=n("2b0e"),r=n("c637"),s=n("a723"),o=n("a8c8"),i=n("3a58"),c=n("cf75"),l=n("8c18"),v=n("e8a3"),p=Object(c["d"])({overlap:Object(c["c"])(s["p"],.3),rounded:Object(c["c"])(s["j"],!1),size:Object(c["c"])(s["u"]),square:Object(c["c"])(s["g"],!1),tag:Object(c["c"])(s["u"],"div"),variant:Object(c["c"])(s["u"])},r["d"]),d=e["default"].extend({name:r["d"],mixins:[l["a"]],provide:function(){return{bvAvatarGroup:this}},props:p,computed:{computedSize:function(){return Object(v["b"])(this.size)},overlapScale:function(){return Object(o["e"])(Object(o["d"])(Object(i["b"])(this.overlap,0),0),1)/2},paddingStyle:function(){var t=this.computedSize;return t=t?"calc(".concat(t," * ").concat(this.overlapScale,")"):null,t?{paddingLeft:t,paddingRight:t}:{}}},render:function(t){var a=t("div",{staticClass:"b-avatar-group-inner",style:this.paddingStyle},this.normalizeSlot());return t(this.tag,{staticClass:"b-avatar-group",attrs:{role:"group"}},[a])}})},"3be5":function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-row",{staticClass:"match-height"},[n("b-col",{attrs:{lg:"6"}},[n("avatar-size")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-initials")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-color")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-light-color")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-icon")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-custom-content")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-badge")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-badge-content")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-badge-position")],1),n("b-col",{attrs:{ld:"6"}},[n("avatar-offset")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-square")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-rounded")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-group")],1),n("b-col",{attrs:{lg:"6"}},[n("avatar-group-tooltip")],1),n("b-col",{attrs:{cols:"12"}},[n("avatar-action")],1)],1)},r=[],s=n("a15b7"),o=n("b28b"),i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-card-code",{attrs:{title:"Sizes"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeSizes)+" ")]},proxy:!0}])},[e("b-card-text",{staticClass:"mb-0"},[e("span",[t._v("Use the prop")]),e("code",[t._v("size")]),e("span",[t._v(" to specify sizes ")]),e("code",[t._v("sm, md")]),e("span",[t._v("and ")]),e("code",[t._v("lg")]),e("span",[t._v(" default to ")]),e("code",[t._v("1.5em, 2.5em")]),e("span",[t._v(" and ")]),e("code",[t._v("3.5em")])]),e("div",{staticClass:"demo-inline-spacing"},[e("b-avatar",{attrs:{size:"sm",src:n("0160")}}),e("b-avatar",{attrs:{src:n("0160")}}),e("b-avatar",{attrs:{size:"lg",src:n("0160")}}),e("b-avatar",{attrs:{size:"70px",src:n("0160")}})],1)],1)},c=[],l=n("1079"),v=n("e8a3"),p=n("d6e4"),d='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar\n      size="sm"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-20.jpg\')"\n    />\n    <b-avatar\n      :src="require(\'@/assets/images/portrait/small/avatar-s-20.jpg\')"\n    />\n    <b-avatar\n      size="lg"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-20.jpg\')"\n    />\n    <b-avatar\n      size="70px"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-20.jpg\')"\n    />\n  </div>\n</template>\n\n<script>\nimport { BAvatar } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar,\n  },\n}\n<\/script>\n',u='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar\n      size="sm"\n      variant="light-primary"\n      text="PI"\n    />\n    <b-avatar\n      variant="light-secondary"\n      text="PI"\n    />\n    <b-avatar\n      size="lg"\n      variant="light-success"\n      text="PI"\n    />\n    <b-avatar\n      size="70px"\n      variant="light-danger"\n      text="PI"\n    />\n  </div>\n</template>\n\n<script>\nimport { BAvatar } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar\n  },\n}\n<\/script>\n',b='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar\n      variant="primary"\n      text="PI"\n    />\n    <b-avatar\n      variant="secondary"\n      text="PI"\n    />\n    <b-avatar\n      variant="success"\n      text="PI"\n    />\n    <b-avatar\n      variant="danger"\n      text="PI"\n    />\n    <b-avatar\n      variant="warning"\n      text="PI"\n    />\n    <b-avatar\n      variant="info"\n      text="PI"\n    />\n  </div>\n</template>\n\n<script>\nimport { BAvatar} from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar,\n  },\n}\n<\/script>\n',g='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar\n      text="PI"\n      variant="light-primary"\n    />\n    <b-avatar\n      text="PI"\n      variant="light-secondary"\n    />\n    <b-avatar\n      text="PI"\n      variant="light-success"\n    />\n    <b-avatar\n      text="PI"\n      variant="light-danger"\n    />\n    <b-avatar\n      text="PI"\n      variant="light-warning"\n    />\n    <b-avatar\n      text="PI"\n      variant="light-info"\n    />\n  </div>\n</template>\n\n<script>\nimport { BAvatar } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar,\n  },\n}\n<\/script>\n',f='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar variant="primary">\n      <feather-icon icon="HomeIcon" />\n    </b-avatar>\n    <b-avatar variant="success">\n      <feather-icon icon="BellIcon" />\n    </b-avatar>\n    <b-avatar variant="info">\n      <feather-icon icon="UserIcon" />\n    </b-avatar>\n    <b-avatar variant="danger">\n      <feather-icon icon="MessageSquareIcon" />\n    </b-avatar>\n  </div>\n</template>\n\n<script>\nimport { BAvatar } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar\n  },\n}\n<\/script>\n',m='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar variant="primary">\n      <span>Hi</span>\n    </b-avatar>\n\n    <b-avatar variant="secondary">\n      <span>New</span>\n    </b-avatar>\n\n    <b-avatar variant="success">\n      <span>Hey</span>\n    </b-avatar>\n\n    <b-avatar variant="light-danger">\n      <span>Hi</span>\n    </b-avatar>\n\n    <b-avatar variant="light-warning">\n      <span>New</span>\n    </b-avatar>\n\n    <b-avatar variant="light-info">\n      <span>Hey</span>\n    </b-avatar>\n  </div>\n</template>\n\n<script>\nimport { BAvatar} from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar\n  },\n}\n<\/script>\n',h='\n<template>\n  <div class="demo-inline-spacing">\n    \x3c!-- using default slot  --\x3e\n    <b-avatar\n      badge="5"\n      badge-variant="primary"\n    >\n      <span class="d-flex align-items-center">\n        <feather-icon\n          icon="DownloadIcon"\n          size="16"\n        />\n      </span>\n    </b-avatar>\n\n    \x3c!-- with badge prop --\x3e\n    <b-avatar\n      badge="3"\n      badge-variant="primary"\n    />\n\n    <b-avatar\n      badge="2"\n      badge-variant="primary"\n    />\n\n    <b-avatar\n      badge="1"\n      badge-variant="primary"\n    />\n\n    <b-avatar\n      badge="10"\n      badge-variant="primary"\n      text="BV"\n    />\n  </div>\n</template>\n\n<script>\nimport { BAvatar} from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar,\n  },\n}\n<\/script>\n',_='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar\n      class="mr-1"\n      badge="B"\n    />\n    <b-avatar\n      badge="7"\n      class="mr-1"\n      variant="primary"\n      badge-variant="danger"\n    />\n    <b-avatar\n      badge-variant="success"\n      badge="1"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-16.jpg\')"\n    />\n</div>\n</template>\n\n<script>\nimport { BAvatar} from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar\n  },\n}\n<\/script>\n',O='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar\n      class="mr-1"\n      badge\n      badge-variant="success"\n    />\n    <b-avatar\n      class="mr-1"\n      badge-variant="success"\n      badge\n      badge-left\n    />\n    <b-avatar\n      badge\n      class="mr-1"\n      badge-variant="success"\n      badge-top\n    />\n    <b-avatar\n      badge\n      class="mr-1"\n      badge-variant="success"\n      badge-left\n      badge-top\n    />\n</div>\n</template>\n\n<script>\nimport { BAvatar} from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar\n  },\n}\n<\/script>\n',j='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar\n      badge\n      badge-variant="success"\n      badge-offset="-0.5em"\n      class="mr-1"\n    />\n    <b-avatar\n      badge\n      badge-variant="success"\n      badge-offset="-2px"\n      class="mr-1"\n    />\n    <b-avatar\n      badge\n      badge-variant="success"\n      badge-offset="2px"\n      class="mr-1"\n    />\n    <b-avatar\n      badge\n      badge-top\n      badge-variant="success"\n      badge-offset="-0.5em"\n      class="mr-1"\n    />\n  </div>\n</template>\n\n<script>\nimport { BAvatar } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar\n  },\n}\n<\/script>\n',y='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar\n      variant="light-primary"\n      square\n    />\n    <b-avatar\n      square\n      variant="light-success"\n    />\n  </div>\n</template>\n\n<script>\nimport { BAvatar } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar\n  },\n}\n<\/script>\n',x='\n<template>\n  <div class="demo-inline-spacing">\n    <b-avatar\n      rounded="sm"\n      variant="light-primary"\n    />\n    <b-avatar\n      rounded\n      variant="light-success"\n    />\n    <b-avatar\n      rounded="top"\n      variant="light-danger"\n    />\n    <b-avatar\n      rounded="lg"\n      variant="light-warning"\n    />\n    <b-avatar\n      rounded="left"\n      variant="light-info"\n    />\n    <b-avatar\n      rounded="right"\n      variant="light-primary"\n    />\n    <b-avatar\n      rounded="bottom"\n      variant="light-dark"\n    />\n  </div>\n</template>\n\n<script>\nimport { BAvatar} from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatar\n  },\n}\n<\/script>\n',C='\n<template>\n  <b-avatar-group size="32px">\n    <b-avatar\n      class="pull-up"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-5.jpg\')"\n    />\n    <b-avatar\n      class="pull-up"\n      variant="primary"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-7.jpg\')"\n    />\n    <b-avatar\n      class="pull-up"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-10.jpg\')"\n    />\n    <b-avatar\n      class="pull-up"\n      variant="danger"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-8.jpg\')"\n    />\n    <b-avatar\n      class="pull-up"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-20.jpg\')"\n    />\n  </b-avatar-group>\n</template>\n\n<script>\nimport { BAvatarGroup, BAvatar, } from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatarGroup,\n    BAvatar,\n  },\n}\n<\/script>\n',B='\n<template>\n  <b-avatar-group size="32px">\n    <b-avatar\n      v-b-tooltip.hover\n      class="pull-up"\n      title="Jenny Looper"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-5.jpg\')"\n    />\n    <b-avatar\n      v-b-tooltip.hover\n      class="pull-up"\n      title="Darcey Nooner"\n      variant="primary"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-7.jpg\')"\n    />\n    <b-avatar\n      v-b-tooltip.hover\n      class="pull-up"\n      title="Julee Rossignol"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-10.jpg\')"\n    />\n    <b-avatar\n      v-b-tooltip.hover\n      class="pull-up"\n      title="Elicia Rieske"\n      variant="danger"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-8.jpg\')"\n    />\n    <b-avatar\n      v-b-tooltip.hover\n      class="pull-up"\n      title="Vinnie Mostowy"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-20.jpg\')"\n    />\n  </b-avatar-group>\n</template>\n\n<script>\nimport {  BAvatarGroup, BAvatar, VBTooltip} from \'bootstrap-vue\'\n\nexport default {\n  components: {\n    BAvatarGroup,\n    BAvatar\n  },\n  directives: {\n    \'b-tooltip\': VBTooltip,\n  },\n}\n<\/script>\n',A='\n<template>\n  <div class="demo-inline-spacing">\n    \x3c!-- button avatar --\x3e\n    <b-avatar\n      button\n      variant="primary"\n      text="BA"\n      class="align-baseline"\n      @click="showToast"\n    />\n    <span> Button Avatar</span>\n\n    \x3c!-- link avatar --\x3e\n    <b-avatar\n      href="#foobar"\n      :src="require(\'@/assets/images/portrait/small/avatar-s-8.jpg\')"\n    />\n    <span>Link Avatar</span>\n  </div>\n</template>\n\n<script>\nimport { BAvatar} from \'bootstrap-vue\'\nimport ToastificationContent from \'@core/components/toastification/ToastificationContent.vue\'\n\nexport default {\n  components: {\n    BAvatar,\n    // eslint-disable-next-line vue/no-unused-components\n    ToastificationContent,\n  },\n  methods: {\n    showToast() {\n      this.$toast({\n        component: ToastificationContent,\n        props: {\n          title: \'Notification\',\n          icon: \'BellIcon\',\n        },\n      })\n    },\n  },\n}\n<\/script>\n',w={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeSizes:d}}},P=w,I=n("2877"),S=Object(I["a"])(P,i,c,!1,null,null,null),k=S.exports,T=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-card-code",{attrs:{title:"Initials"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeInitials)+" ")]},proxy:!0}])},[n("b-card-text",{staticClass:"mb-0"},[n("span",[t._v("You can specify a short string as the content of an avatar via the ")]),n("code",[t._v("text")]),n("span",[t._v(" prop.")])]),n("div",{staticClass:"demo-inline-spacing"},[n("b-avatar",{attrs:{size:"sm",variant:"light-primary",text:"PI"}}),n("b-avatar",{attrs:{variant:"light-secondary",text:"PI"}}),n("b-avatar",{attrs:{size:"lg",variant:"light-success",text:"PI"}}),n("b-avatar",{attrs:{size:"70px",variant:"light-danger",text:"PI"}})],1)],1)},z=[],E={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeInitials:u}}},$=E,q=Object(I["a"])($,T,z,!1,null,null,null),D=q.exports,G=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-card-code",{attrs:{title:"Colors"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeColor)+" ")]},proxy:!0}])},[n("b-card-text",{staticClass:"mb-0"},[n("span",[t._v("Use the ")]),n("code",[t._v("variant")]),n("span",[t._v(" prop to specify one of Bootstrap theme variant colors.")])]),n("div",{staticClass:"demo-inline-spacing"},[n("b-avatar",{attrs:{variant:"primary",text:"PI"}}),n("b-avatar",{attrs:{variant:"secondary",text:"PI"}}),n("b-avatar",{attrs:{variant:"success",text:"PI"}}),n("b-avatar",{attrs:{variant:"danger",text:"PI"}}),n("b-avatar",{attrs:{variant:"warning",text:"PI"}}),n("b-avatar",{attrs:{variant:"info",text:"PI"}})],1)],1)},N=[],H={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeColor:b}}},V=H,L=Object(I["a"])(V,G,N,!1,null,null,null),R=L.exports,U=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-card-code",{attrs:{title:"Light Colors"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeColorLight)+" ")]},proxy:!0}])},[n("b-card-text",{staticClass:"mb-0"},[n("span",[t._v("use class ")]),n("code",[t._v('variant="light-{color-name}"')]),n("span",[t._v(" to change background color of your avatar.")])]),n("div",{staticClass:"demo-inline-spacing"},[n("b-avatar",{attrs:{text:"PI",variant:"light-primary"}}),n("b-avatar",{attrs:{text:"PI",variant:"light-secondary"}}),n("b-avatar",{attrs:{text:"PI",variant:"light-success"}}),n("b-avatar",{attrs:{text:"PI",variant:"light-danger"}}),n("b-avatar",{attrs:{text:"PI",variant:"light-warning"}}),n("b-avatar",{attrs:{text:"PI",variant:"light-info"}})],1)],1)},J=[],M=n("541c"),Y={components:{BAvatar:v["a"],BCardCode:M["a"],BCardText:p["a"]},data:function(){return{codeColorLight:g}}},F=Y,W=Object(I["a"])(F,U,J,!1,null,null,null),K=W.exports,Q=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-card-code",{attrs:{title:"Actionable avatars"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeAction)+" ")]},proxy:!0}])},[e("b-card-text",{staticClass:"mb-0"},[e("span",[t._v("Want to trigger the opening of a modal or trigger an action? Set the button prop to instruct")]),e("code",[t._v("<b-avatar>")]),e("span",[t._v(" to render as a ")]),e("code",[t._v("<button>")]),e("span",[t._v(" element.")])]),e("div",{staticClass:"demo-inline-spacing"},[e("b-avatar",{staticClass:"align-baseline",attrs:{button:"",variant:"primary",text:"BA"},on:{click:t.showToast}}),e("span",[t._v(" Button Avatar")]),e("b-avatar",{attrs:{href:"#foobar",src:n("ed5f")}}),e("span",[t._v("Link Avatar")])],1)],1)},X=[],Z=n("223c"),tt={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"],ToastificationContent:Z["a"]},data:function(){return{codeAction:A}},methods:{showToast:function(){this.$toast({component:Z["a"],props:{title:"Notification",icon:"BellIcon"}})}}},at=tt,nt=Object(I["a"])(at,Q,X,!1,null,null,null),et=nt.exports,rt=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-card-code",{attrs:{title:"Badge avatars"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeBadge)+" ")]},proxy:!0}])},[n("b-card-text",{staticClass:"mb-0"},[n("span",[t._v("Easily add a badge to your avatar via the ")]),n("code",[t._v("badge")]),n("span",[t._v(" prop or ")]),n("code",[t._v("'badge'")]),n("span",[t._v(" slot, and the badge variant can be set via the ")]),n("code",[t._v("badge-variant")]),n("span",[t._v(" prop. The badge will scale with the size of the avatar.")])]),n("div",{staticClass:"demo-inline-spacing"},[n("b-avatar",{attrs:{badge:"5","badge-variant":"primary"}},[n("span",{staticClass:"d-flex align-items-center"},[n("feather-icon",{attrs:{icon:"DownloadIcon",size:"16"}})],1)]),n("b-avatar",{attrs:{badge:"3","badge-variant":"primary"}}),n("b-avatar",{attrs:{badge:"2","badge-variant":"primary"}}),n("b-avatar",{attrs:{badge:"1","badge-variant":"primary"}}),n("b-avatar",{attrs:{badge:"10","badge-variant":"primary",text:"BV"}})],1)],1)},st=[],ot={components:{BCardCode:l["a"],BCardText:p["a"],BAvatar:v["a"]},data:function(){return{codeBadge:h}}},it=ot,ct=Object(I["a"])(it,rt,st,!1,null,null,null),lt=ct.exports,vt=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-card-code",{attrs:{title:"Badge positioning"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeBadgePosition)+" ")]},proxy:!0}])},[n("b-card-text",{staticClass:"mb-0"},[n("span",[t._v("By default the badge appears on the bottom right of the avatar. ")]),n("span",[t._v("You can use the ")]),n("code",[t._v("badge-top")]),n("span",[t._v(" and ")]),n("code",[t._v("badge-right")]),n("span",[t._v(" boolean props to switch the sides.")])]),n("div",{staticClass:"demo-inline-spacing"},[n("b-avatar",{staticClass:"mr-1",attrs:{badge:"","badge-variant":"success"}}),n("b-avatar",{staticClass:"mr-1",attrs:{"badge-variant":"success",badge:"","badge-left":""}}),n("b-avatar",{staticClass:"mr-1",attrs:{badge:"","badge-variant":"success","badge-top":""}}),n("b-avatar",{staticClass:"mr-1",attrs:{badge:"","badge-variant":"success","badge-left":"","badge-top":""}})],1)],1)},pt=[],dt={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeBadgePosition:O}}},ut=dt,bt=Object(I["a"])(ut,vt,pt,!1,null,null,null),gt=bt.exports,ft=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-card-code",{attrs:{title:"Badge Offset"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeBadgeOffset)+" ")]},proxy:!0}])},[n("b-card-text",{staticClass:"mb-0"},[n("span",[t._v("Use the ")]),n("code",[t._v("badge-offset")]),n("span",[t._v(" prop to control the offset of the badge. ")]),n("span",[t._v("Positive values will move the badge inward, while negative values will move the badge outward.")])]),n("div",{staticClass:"demo-inline-spacing"},[n("b-avatar",{staticClass:"mr-1",attrs:{badge:"","badge-variant":"success","badge-offset":"-0.5em"}}),n("b-avatar",{staticClass:"mr-1",attrs:{badge:"","badge-variant":"success","badge-offset":"-2px"}}),n("b-avatar",{staticClass:"mr-1",attrs:{badge:"","badge-variant":"success","badge-offset":"2px"}}),n("b-avatar",{staticClass:"mr-1",attrs:{badge:"","badge-top":"","badge-variant":"success","badge-offset":"-0.5em"}})],1)],1)},mt=[],ht={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeBadgeOffset:j}}},_t=ht,Ot=Object(I["a"])(_t,ft,mt,!1,null,null,null),jt=Ot.exports,yt=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-card-code",{attrs:{title:"Icons"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeIcon)+" ")]},proxy:!0}])},[n("b-card-text",{staticClass:"mb-0"},[n("span",[t._v("Easily use one of ")]),n("code",[t._v("BootstrapVue's")]),n("span",[t._v(" icons as the avatar content via the ")]),n("code",[t._v("icon")]),n("span",[t._v(" prop. The prop should be set to a valid icon name.")])]),n("div",{staticClass:"demo-inline-spacing"},[n("b-avatar",{attrs:{variant:"primary"}},[n("feather-icon",{attrs:{icon:"HomeIcon"}})],1),n("b-avatar",{attrs:{variant:"success"}},[n("feather-icon",{attrs:{icon:"BellIcon"}})],1),n("b-avatar",{attrs:{variant:"info"}},[n("feather-icon",{attrs:{icon:"UserIcon"}})],1),n("b-avatar",{attrs:{variant:"danger"}},[n("feather-icon",{attrs:{icon:"MessageSquareIcon"}})],1)],1)],1)},xt=[],Ct={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeIcon:f}}},Bt=Ct,At=Object(I["a"])(Bt,yt,xt,!1,null,null,null),wt=At.exports,Pt=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-card-code",{attrs:{title:"Custom content"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeCustomContent)+" ")]},proxy:!0}])},[n("b-card-text",{staticClass:"mb-0"},[n("span",[t._v("Use the ")]),n("code",[t._v("default")]),n("span",[t._v("slot to render custom content in the avatar, for finer grained control of its appearance.")])]),n("div",{staticClass:"demo-inline-spacing"},[n("b-avatar",{attrs:{variant:"primary"}},[n("span",[t._v("Hi")])]),n("b-avatar",{attrs:{variant:"secondary"}},[n("span",[t._v("New")])]),n("b-avatar",{attrs:{variant:"success"}},[n("span",[t._v("Hey")])]),n("b-avatar",{attrs:{variant:"light-danger"}},[n("span",[t._v("Hi")])]),n("b-avatar",{attrs:{variant:"light-warning"}},[n("span",[t._v("New")])]),n("b-avatar",{attrs:{variant:"light-info"}},[n("span",[t._v("Hey")])])],1)],1)},It=[],St={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeCustomContent:m}}},kt=St,Tt=Object(I["a"])(kt,Pt,It,!1,null,null,null),zt=Tt.exports,Et=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-card-code",{attrs:{title:"Badge content"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeBadgeContent)+" ")]},proxy:!0}])},[e("b-card-text",{staticClass:"mb-0"},[e("span",[t._v("Add textual content to the badge by supplying a string to the ")]),e("code",[t._v("badge")]),e("span",[t._v(" prop, or use the named slot ")]),e("code",[t._v("'badge'")]),t._v(". ")]),e("div",{staticClass:"demo-inline-spacing"},[e("b-avatar",{staticClass:"mr-1",attrs:{badge:"B"}}),e("b-avatar",{staticClass:"mr-1",attrs:{badge:"7",variant:"primary","badge-variant":"danger"}}),e("b-avatar",{attrs:{"badge-variant":"success",badge:"1",src:n("6683")}})],1)],1)},$t=[],qt={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeBadgeContent:_}}},Dt=qt,Gt=Object(I["a"])(Dt,Et,$t,!1,null,null,null),Nt=Gt.exports,Ht=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-card-code",{attrs:{title:"Square"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeSquare)+" ")]},proxy:!0}])},[n("b-card-text",{staticClass:"mb-0"},[n("span",[t._v(" Prefer a square avatar? simply set the ")]),n("code",[t._v("square")]),n("span",[t._v(" prop to ")]),n("code",[t._v("true")]),t._v(". ")]),n("div",{staticClass:"demo-inline-spacing"},[n("b-avatar",{attrs:{variant:"light-primary",square:""}}),n("b-avatar",{attrs:{square:"",variant:"light-success"}})],1)],1)},Vt=[],Lt={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeSquare:y}}},Rt=Lt,Ut=Object(I["a"])(Rt,Ht,Vt,!1,null,null,null),Jt=Ut.exports,Mt=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("b-card-code",{attrs:{title:"Rounded"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeRounded)+" ")]},proxy:!0}])},[n("b-card-text",{staticClass:"mb-0"},[n("span",[t._v(" You can change the rounding by setting the prop")]),n("code",[t._v("rounded")]),n("span",[t._v(".")])]),n("div",{staticClass:"demo-inline-spacing"},[n("b-avatar",{attrs:{rounded:"sm",variant:"light-primary"}}),n("b-avatar",{attrs:{rounded:"",variant:"light-success"}}),n("b-avatar",{attrs:{rounded:"top",variant:"light-danger"}}),n("b-avatar",{attrs:{rounded:"lg",variant:"light-warning"}}),n("b-avatar",{attrs:{rounded:"left",variant:"light-info"}}),n("b-avatar",{attrs:{rounded:"right",variant:"light-primary"}}),n("b-avatar",{attrs:{rounded:"bottom",variant:"light-dark"}})],1)],1)},Yt=[],Ft={components:{BCardCode:l["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeRounded:x}}},Wt=Ft,Kt=Object(I["a"])(Wt,Mt,Yt,!1,null,null,null),Qt=Kt.exports,Xt=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-card-code",{attrs:{title:"Avatar Group"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeGroup)+" ")]},proxy:!0}])},[e("b-card-text",[e("span",[t._v("Group multiple avatars together by wrapping them in a ")]),e("code",[t._v("<b-avatar-group>")]),e("span",[t._v(" component. Add class ")]),e("code",[t._v("pull-up")]),e("span",[t._v(" for pull up the avatar on hover.")])]),e("b-avatar-group",{attrs:{size:"32px"}},[e("b-avatar",{staticClass:"pull-up",attrs:{src:n("9a5e")}}),e("b-avatar",{staticClass:"pull-up",attrs:{variant:"primary",src:n("b690")}}),e("b-avatar",{staticClass:"pull-up",attrs:{src:n("351c")}}),e("b-avatar",{staticClass:"pull-up",attrs:{variant:"danger",src:n("ed5f")}}),e("b-avatar",{staticClass:"pull-up",attrs:{src:n("0160")}})],1)],1)},Zt=[],ta=n("3985"),aa={components:{BCardCode:M["a"],BAvatarGroup:ta["a"],BAvatar:v["a"],BCardText:p["a"]},data:function(){return{codeGroup:C}}},na=aa,ea=Object(I["a"])(na,Xt,Zt,!1,null,null,null),ra=ea.exports,sa=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-card-code",{attrs:{title:"Avatar Group with Tooltip"},scopedSlots:t._u([{key:"code",fn:function(){return[t._v(" "+t._s(t.codeGroupTooltip)+" ")]},proxy:!0}])},[e("b-card-text",[e("span",[t._v("Use bootstrapVue's ")]),e("code",[t._v("VBTooltip")]),e("span",[t._v(" directive with avatar to use tooltip. ")]),e("span",[t._v("Add class ")]),e("code",[t._v("pull-up")]),e("span",[t._v(" for pull up the avatar on hover.")])]),e("b-avatar-group",{attrs:{size:"32px"}},[e("b-avatar",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"pull-up",attrs:{title:"Jenny Looper",src:n("9a5e")}}),e("b-avatar",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"pull-up",attrs:{title:"Darcey Nooner",variant:"primary",src:n("b690")}}),e("b-avatar",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"pull-up",attrs:{title:"Julee Rossignol",src:n("351c")}}),e("b-avatar",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"pull-up",attrs:{title:"Elicia Rieske",variant:"danger",src:n("ed5f")}}),e("b-avatar",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"pull-up",attrs:{title:"Vinnie Mostowy",src:n("0160")}})],1)],1)},oa=[],ia=n("2616"),ca={components:{BCardCode:M["a"],BAvatarGroup:ta["a"],BAvatar:v["a"],BCardText:p["a"]},directives:{"b-tooltip":ia["a"]},data:function(){return{codeGroupTooltip:B}}},la=ca,va=Object(I["a"])(la,sa,oa,!1,null,null,null),pa=va.exports,da={components:{BRow:s["a"],BCol:o["a"],AvatarInitials:D,AvatarColor:R,AvatarLightColor:K,AvatarSize:k,AvatarAction:et,AvatarBadge:lt,AvatarBadgePosition:gt,AvatarOffset:jt,AvatarIcon:wt,AvatarCustomContent:zt,AvatarBadgeContent:Nt,AvatarSquare:Jt,AvatarRounded:Qt,AvatarGroup:ra,AvatarGroupTooltip:pa}},ua=da,ba=Object(I["a"])(ua,e,r,!1,null,null,null);a["default"]=ba.exports},6683:function(t,a,n){t.exports=n.p+"img/avatar-s-16.037d5bcb.jpg"},a15b7:function(t,a,n){"use strict";n.d(a,"a",(function(){return j}));var e=n("b42e"),r=n("c637"),s=n("a723"),o=n("2326"),i=n("228e"),c=n("6c06"),l=n("b508"),v=n("d82f"),p=n("cf75"),d=n("fa73");function u(t,a){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);a&&(e=e.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),n.push.apply(n,e)}return n}function b(t){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?u(Object(n),!0).forEach((function(a){g(t,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))}))}return t}function g(t,a,n){return a in t?Object.defineProperty(t,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[a]=n,t}var f=["start","end","center"],m=Object(l["a"])((function(t,a){return a=Object(d["h"])(Object(d["g"])(a)),a?Object(d["c"])(["row-cols",t,a].filter(c["a"]).join("-")):null})),h=Object(l["a"])((function(t){return Object(d["c"])(t.replace("cols",""))})),_=[],O=function(){var t=Object(i["b"])().reduce((function(t,a){return t[Object(p["g"])(a,"cols")]=Object(p["c"])(s["p"]),t}),Object(v["c"])(null));return _=Object(v["h"])(t),Object(p["d"])(Object(v["m"])(b(b({},t),{},{alignContent:Object(p["c"])(s["u"],null,(function(t){return Object(o["a"])(Object(o["b"])(f,"between","around","stretch"),t)})),alignH:Object(p["c"])(s["u"],null,(function(t){return Object(o["a"])(Object(o["b"])(f,"between","around"),t)})),alignV:Object(p["c"])(s["u"],null,(function(t){return Object(o["a"])(Object(o["b"])(f,"baseline","stretch"),t)})),noGutters:Object(p["c"])(s["g"],!1),tag:Object(p["c"])(s["u"],"div")})),r["Ob"])},j={name:r["Ob"],functional:!0,get props(){return delete this.props,this.props=O(),this.props},render:function(t,a){var n,r=a.props,s=a.data,o=a.children,i=r.alignV,c=r.alignH,l=r.alignContent,v=[];return _.forEach((function(t){var a=m(h(t),r[t]);a&&v.push(a)})),v.push((n={"no-gutters":r.noGutters},g(n,"align-items-".concat(i),i),g(n,"justify-content-".concat(c),c),g(n,"align-content-".concat(l),l),n)),t(r.tag,Object(e["a"])(s,{staticClass:"row",class:v}),o)}}},b28b:function(t,a,n){"use strict";n.d(a,"a",(function(){return x}));var e=n("b42e"),r=n("c637"),s=n("a723"),o=n("992e"),i=n("2326"),c=n("228e"),l=n("6c06"),v=n("7b1e"),p=n("b508"),d=n("d82f"),u=n("cf75"),b=n("fa73");function g(t,a){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);a&&(e=e.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),n.push.apply(n,e)}return n}function f(t){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?g(Object(n),!0).forEach((function(a){m(t,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))}))}return t}function m(t,a,n){return a in t?Object.defineProperty(t,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[a]=n,t}var h=["auto","start","end","center","baseline","stretch"],_=function(t,a,n){var e=t;if(!Object(v["p"])(n)&&!1!==n)return a&&(e+="-".concat(a)),"col"!==t||""!==n&&!0!==n?(e+="-".concat(n),Object(b["c"])(e)):Object(b["c"])(e)},O=Object(p["a"])(_),j=Object(d["c"])(null),y=function(){var t=Object(c["b"])().filter(l["a"]),a=t.reduce((function(t,a){return t[a]=Object(u["c"])(s["i"]),t}),Object(d["c"])(null)),n=t.reduce((function(t,a){return t[Object(u["g"])(a,"offset")]=Object(u["c"])(s["p"]),t}),Object(d["c"])(null)),e=t.reduce((function(t,a){return t[Object(u["g"])(a,"order")]=Object(u["c"])(s["p"]),t}),Object(d["c"])(null));return j=Object(d["a"])(Object(d["c"])(null),{col:Object(d["h"])(a),offset:Object(d["h"])(n),order:Object(d["h"])(e)}),Object(u["d"])(Object(d["m"])(f(f(f(f({},a),n),e),{},{alignSelf:Object(u["c"])(s["u"],null,(function(t){return Object(i["a"])(h,t)})),col:Object(u["c"])(s["g"],!1),cols:Object(u["c"])(s["p"]),offset:Object(u["c"])(s["p"]),order:Object(u["c"])(s["p"]),tag:Object(u["c"])(s["u"],"div")})),r["y"])},x={name:r["y"],functional:!0,get props(){return delete this.props,this.props=y()},render:function(t,a){var n,r=a.props,s=a.data,i=a.children,c=r.cols,l=r.offset,v=r.order,p=r.alignSelf,d=[];for(var u in j)for(var b=j[u],g=0;g<b.length;g++){var f=O(u,b[g].replace(u,""),r[b[g]]);f&&d.push(f)}var h=d.some((function(t){return o["e"].test(t)}));return d.push((n={col:r.col||!h&&!c},m(n,"col-".concat(c),c),m(n,"offset-".concat(l),l),m(n,"order-".concat(v),v),m(n,"align-self-".concat(p),p),n)),t(r.tag,Object(e["a"])(s,{class:d}),i)}}},d6e4:function(t,a,n){"use strict";n.d(a,"a",(function(){return l}));var e=n("2b0e"),r=n("b42e"),s=n("c637"),o=n("a723"),i=n("cf75"),c=Object(i["d"])({textTag:Object(i["c"])(o["u"],"p")},s["u"]),l=e["default"].extend({name:s["u"],functional:!0,props:c,render:function(t,a){var n=a.props,e=a.data,s=a.children;return t(n.textTag,Object(r["a"])(e,{staticClass:"card-text"}),s)}})}}]);
//# sourceMappingURL=chunk-6049e87d.0641a2ee.js.map