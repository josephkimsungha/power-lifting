function e(e,t,r,o){Object.defineProperty(e,t,{get:r,set:o,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r=globalThis.parcelRequire718f,o=r.register;o("2Aebl",function(t,r){e(t.exports,"State",()=>n);let o={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8},i=class e{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(1&this.data)}set blend(e){!!(1&this.data)!==e&&(this.data^=1)}get offsets(){return!!(2&this.data)}set offsets(e){!!(2&this.data)!==e&&(this.data^=2)}set cullMode(e){if("none"===e){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace="front"===e}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(4&this.data)}set culling(e){!!(4&this.data)!==e&&(this.data^=4)}get depthTest(){return!!(8&this.data)}set depthTest(e){!!(8&this.data)!==e&&(this.data^=8)}get depthMask(){return!!(32&this.data)}set depthMask(e){!!(32&this.data)!==e&&(this.data^=32)}get clockwiseFrontFace(){return!!(16&this.data)}set clockwiseFrontFace(e){!!(16&this.data)!==e&&(this.data^=16)}get blendMode(){return this._blendMode}set blendMode(e){this.blend="none"!==e,this._blendMode=e,this._blendModeId=o[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){let t=new e;return t.depthTest=!1,t.blend=!0,t}};i.default2d=i.for2d();let n=i}),o("6B0gZ",function(t,r){e(t.exports,"color32BitToUniform",()=>o);function o(e,t,r){let o=(e>>24&255)/255;t[r++]=(255&e)/255*o,t[r++]=(e>>8&255)/255*o,t[r++]=(e>>16&255)/255*o,t[r++]=o}}),o("cryyq",function(t,o){e(t.exports,"UniformGroup",()=>u);var i=r("aGJhg"),n=r("9kWs1"),s=r("ezKtQ");let a=class e{constructor(t,r){this._touched=0,this.uid=(0,i.uid)("uniform"),this._resourceType="uniformGroup",this._resourceId=(0,i.uid)("resource"),this.isUniformGroup=!0,this._dirtyId=0,this.destroyed=!1,r={...e.defaultOptions,...r},this.uniformStructures=t;let o={};for(let e in t){let r=t[e];r.name=e,r.size=r.size??1,r.value??(r.value=(0,s.getDefaultUniformValue)(r.type,r.size)),o[e]=r.value}this.uniforms=o,this._dirtyId=1,this.ubo=r.ubo,this.isStatic=r.isStatic,this._signature=(0,n.createIdFromString)(Object.keys(o).map(e=>`${e}-${t[e].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};a.defaultOptions={ubo:!1,isStatic:!1};let u=a}),o("9kWs1",function(t,r){e(t.exports,"createIdFromString",()=>n);let o=Object.create(null),i=Object.create(null);function n(e,t){let r=i[e];return void 0===r&&(void 0===o[t]&&(o[t]=1),i[e]=r=o[t]++),r}}),o("ezKtQ",function(t,r){e(t.exports,"getDefaultUniformValue",()=>o);function o(e,t){switch(e){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*t);case"vec3<f32>":return new Float32Array(3*t);case"vec4<f32>":return new Float32Array(4*t);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}}),o("6qNFd",function(t,r){e(t.exports,"BatchableSprite",()=>o);class o{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.groupBlendMode}packAttributes(e,t,r,o){let i=this.renderable,n=this.texture,s=i.groupTransform,a=s.a,u=s.b,l=s.c,c=s.d,d=s.tx,f=s.ty,m=this.bounds,p=m.maxX,h=m.minX,g=m.maxY,x=m.minY,v=n.uvs,b=i.groupColorAlpha,P=o<<16|65535&this.roundPixels;e[r+0]=a*h+l*x+d,e[r+1]=c*x+u*h+f,e[r+2]=v.x0,e[r+3]=v.y0,t[r+4]=b,t[r+5]=P,e[r+6]=a*p+l*x+d,e[r+7]=c*x+u*p+f,e[r+8]=v.x1,e[r+9]=v.y1,t[r+10]=b,t[r+11]=P,e[r+12]=a*p+l*g+d,e[r+13]=c*g+u*p+f,e[r+14]=v.x2,e[r+15]=v.y2,t[r+16]=b,t[r+17]=P,e[r+18]=a*h+l*g+d,e[r+19]=c*g+u*h+f,e[r+20]=v.x3,e[r+21]=v.y3,t[r+22]=b,t[r+23]=P}packIndex(e,t,r){e[t]=r+0,e[t+1]=r+1,e[t+2]=r+2,e[t+3]=r+0,e[t+4]=r+2,e[t+5]=r+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}}),o("3Xbp7",function(t,o){e(t.exports,"TexturePool",()=>u);var i=r("NbSCN"),n=r("iA5fe"),s=r("bLlTJ");let a=0,u=new class{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,t,r){let o=new n.TextureSource({...this.textureOptions,width:e,height:t,resolution:1,antialias:r,autoGarbageCollect:!0});return new s.Texture({source:o,label:`texturePool_${a++}`})}getOptimalTexture(e,t,r=1,o){let n=Math.ceil(e*r-1e-6),s=Math.ceil(t*r-1e-6),a=((n=(0,i.nextPow2)(n))<<17)+((s=(0,i.nextPow2)(s))<<1)+(o?1:0);this._texturePool[a]||(this._texturePool[a]=[]);let u=this._texturePool[a].pop();return u||(u=this.createTexture(n,s,o)),u.source._resolution=r,u.source.width=n/r,u.source.height=s/r,u.source.pixelWidth=n,u.source.pixelHeight=s,u.frame.x=0,u.frame.y=0,u.frame.width=e,u.frame.height=t,u.updateUvs(),this._poolKeyHash[u.uid]=a,u}getSameSizeTexture(e,t=!1){let r=e.source;return this.getOptimalTexture(e.width,e.height,r._resolution,t)}returnTexture(e){let t=this._poolKeyHash[e.uid];this._texturePool[t].push(e)}clear(e){if(e=!1!==e)for(let e in this._texturePool){let t=this._texturePool[e];if(t)for(let e=0;e<t.length;e++)t[e].destroy(!0)}this._texturePool={}}}}),o("3JBHn",function(t,o){e(t.exports,"compileHighShaderGpuProgram",()=>l),e(t.exports,"compileHighShaderGlProgram",()=>c);var i=r("fK92B"),n=r("6j7wq"),s=r("i8pLT"),a=r("jOJh1"),u=r("8hMvn");function l({bits:e,name:t}){let r=(0,s.compileHighShader)({template:{fragment:a.fragmentGPUTemplate,vertex:a.vertexGPUTemplate},bits:[u.globalUniformsBit,...e]});return(0,n.GpuProgram).from({name:t,vertex:{source:r.vertex,entryPoint:"main"},fragment:{source:r.fragment,entryPoint:"main"}})}function c({bits:e,name:t}){return new i.GlProgram({name:t,...(0,s.compileHighShaderGl)({template:{vertex:a.vertexGlTemplate,fragment:a.fragmentGlTemplate},bits:[u.globalUniformsBitGl,...e]})})}}),o("fK92B",function(t,o){e(t.exports,"GlProgram",()=>m);var i=r("9kWs1"),n=r("c1vp1"),s=r("iCp49"),a=r("67Nsh"),u=r("3Hbxe"),l=r("aUAMu");let c={stripVersion:r("500fb").stripVersion,ensurePrecision:a.ensurePrecision,addProgramDefines:s.addProgramDefines,setProgramName:l.setProgramName,insertVersion:u.insertVersion},d=Object.create(null),f=class e{constructor(t){let r=-1!==(t={...e.defaultOptions,...t}).fragment.indexOf("#version 300 es"),o={stripVersion:r,ensurePrecision:{requestedFragmentPrecision:t.preferredFragmentPrecision,requestedVertexPrecision:t.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:(0,n.getMaxFragmentPrecision)()},setProgramName:{name:t.name},addProgramDefines:r,insertVersion:r},s=t.fragment,a=t.vertex;Object.keys(c).forEach(e=>{let t=o[e];s=c[e](s,t,!0),a=c[e](a,t,!1)}),this.fragment=s,this.vertex=a,this._key=(0,i.createIdFromString)(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(t){let r=`${t.vertex}:${t.fragment}`;return d[r]||(d[r]=new e(t)),d[r]}};f.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let m=f}),o("c1vp1",function(t,o){let i;e(t.exports,"getMaxFragmentPrecision",()=>s);var n=r("ckKKH");function s(){if(!i){i="mediump";let e=(0,n.getTestContext)();e&&e.getShaderPrecisionFormat&&(i=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision?"highp":"mediump")}return i}}),o("ckKKH",function(t,o){let i;e(t.exports,"getTestContext",()=>s);var n=r("iCGeI");function s(){return(!i||i?.isContextLost())&&(i=(0,n.DOMAdapter).get().createCanvas().getContext("webgl",{})),i}}),o("iCp49",function(t,r){e(t.exports,"addProgramDefines",()=>o);function o(e,t,r){return t?e:r?(e=e.replace("out vec4 finalColor;",""),`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${e}
        `):`
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${e}
        `}}),o("67Nsh",function(t,r){e(t.exports,"ensurePrecision",()=>o);function o(e,t,r){let o=r?t.maxSupportedFragmentPrecision:t.maxSupportedVertexPrecision;if("precision"!==e.substring(0,9)){let i=r?t.requestedFragmentPrecision:t.requestedVertexPrecision;return"highp"===i&&"highp"!==o&&(i="mediump"),`precision ${i} float;
${e}`}return"highp"!==o&&"precision highp"===e.substring(0,15)?e.replace("precision highp","precision mediump"):e}}),o("3Hbxe",function(t,r){e(t.exports,"insertVersion",()=>o);function o(e,t){return t?`#version 300 es
${e}`:e}}),o("aUAMu",function(t,r){e(t.exports,"setProgramName",()=>n);let o={},i={};function n(e,{name:t="pixi-program"},r=!0){t=t.replace(/\s+/g,"-")+(r?"-fragment":"-vertex");let n=r?o:i;if(n[t]?(n[t]++,t+=`-${n[t]}`):n[t]=1,-1!==e.indexOf("#define SHADER_NAME"))return e;let s=`#define SHADER_NAME ${t}`;return`${s}
${e}`}}),o("500fb",function(t,r){e(t.exports,"stripVersion",()=>o);function o(e,t){return t?e.replace("#version 300 es",""):e}}),o("6j7wq",function(t,o){e(t.exports,"GpuProgram",()=>d);var i=r("9kWs1"),n=r("7j3L3"),s=r("ceyhm"),a=r("eebg6"),u=r("gwiyt"),l=r("ftyd4");let c=Object.create(null);class d{constructor(e){this._layoutKey=0;let{fragment:t,vertex:r,layout:o,gpuLayout:i,name:n}=e;if(this.name=n,this.fragment=t,this.vertex=r,t.source===r.source){let e=(0,s.extractStructAndGroups)(t.source);this.structsAndGroups=e}else{let e=(0,s.extractStructAndGroups)(r.source),o=(0,s.extractStructAndGroups)(t.source);this.structsAndGroups=(0,l.removeStructAndGroupDuplicates)(e,o)}this.layout=o??(0,u.generateLayoutHash)(this.structsAndGroups),this.gpuLayout=i??(0,a.generateGpuLayoutGroups)(this.structsAndGroups),this.autoAssignGlobalUniforms=this.layout[0]?.globalUniforms!==void 0,this.autoAssignLocalUniforms=this.layout[1]?.localUniforms!==void 0,this._generateProgramKey()}_generateProgramKey(){let{vertex:e,fragment:t}=this,r=e.source+t.source+e.entryPoint+t.entryPoint;this._layoutKey=(0,i.createIdFromString)(r,"program")}get attributeData(){return this._attributeData??(this._attributeData=(0,n.extractAttributesFromGpuProgram)(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(e){let t=`${e.vertex.source}:${e.fragment.source}:${e.fragment.entryPoint}:${e.vertex.entryPoint}`;return c[t]||(c[t]=new d(e)),c[t]}}}),o("7j3L3",function(t,o){e(t.exports,"extractAttributesFromGpuProgram",()=>s);var i=r("kavUV");let n={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function s({source:e,entryPoint:t}){let r={},o=e.indexOf(`fn ${t}`);if(-1!==o){let t=e.indexOf("->",o);if(-1!==t){let s;let a=e.substring(o,t),u=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;for(;null!==(s=u.exec(a));){let e=n[s[3]]??"float32";r[s[2]]={location:parseInt(s[1],10),format:e,stride:(0,i.getAttributeInfoFromFormat)(e).stride,offset:0,instance:!1,start:0}}}}return r}}),o("kavUV",function(t,r){e(t.exports,"getAttributeInfoFromFormat",()=>i);let o={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function i(e){return o[e]??o.float32}}),o("ceyhm",function(t,r){e(t.exports,"extractStructAndGroups",()=>o);function o(e){let t=/@group\((\d+)\)/,r=/@binding\((\d+)\)/,o=/var(<[^>]+>)? (\w+)/,i=/:\s*(\w+)/,n=/(\w+)\s*:\s*([\w\<\>]+)/g,s=/struct\s+(\w+)/,a=e.match(/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g)?.map(e=>({group:parseInt(e.match(t)[1],10),binding:parseInt(e.match(r)[1],10),name:e.match(o)[2],isUniform:"<uniform>"===e.match(o)[1],type:e.match(i)[1]}));if(!a)return{groups:[],structs:[]};let u=e.match(/struct\s+(\w+)\s*{([^}]+)}/g)?.map(e=>{let t=e.match(s)[1],r=e.match(n).reduce((e,t)=>{let[r,o]=t.split(":");return e[r.trim()]=o.trim(),e},{});return r?{name:t,members:r}:null}).filter(({name:e})=>a.some(t=>t.type===e))??[];return{groups:a,structs:u}}}),o("eebg6",function(t,o){e(t.exports,"generateGpuLayoutGroups",()=>n);var i=r("aR3rf");function n({groups:e}){let t=[];for(let r=0;r<e.length;r++){let o=e[r];t[o.group]||(t[o.group]=[]),o.isUniform?t[o.group].push({binding:o.binding,visibility:i.ShaderStage.VERTEX|i.ShaderStage.FRAGMENT,buffer:{type:"uniform"}}):"sampler"===o.type?t[o.group].push({binding:o.binding,visibility:i.ShaderStage.FRAGMENT,sampler:{type:"filtering"}}):"texture_2d"===o.type&&t[o.group].push({binding:o.binding,visibility:i.ShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return t}}),o("aR3rf",function(t,r){e(t.exports,"ShaderStage",()=>i);var o,i=((o=i||{})[o.VERTEX=1]="VERTEX",o[o.FRAGMENT=2]="FRAGMENT",o[o.COMPUTE=4]="COMPUTE",o)}),o("gwiyt",function(t,r){e(t.exports,"generateLayoutHash",()=>o);function o({groups:e}){let t=[];for(let r=0;r<e.length;r++){let o=e[r];t[o.group]||(t[o.group]={}),t[o.group][o.name]=o.binding}return t}}),o("ftyd4",function(t,r){e(t.exports,"removeStructAndGroupDuplicates",()=>o);function o(e,t){let r=new Set,o=new Set;return{structs:[...e.structs,...t.structs].filter(e=>!r.has(e.name)&&(r.add(e.name),!0)),groups:[...e.groups,...t.groups].filter(e=>{let t=`${e.name}-${e.binding}`;return!o.has(t)&&(o.add(t),!0)})}}}),o("i8pLT",function(t,o){e(t.exports,"compileHighShader",()=>f),e(t.exports,"compileHighShaderGl",()=>m);var i=r("9zLXd"),n=r("jJet4"),s=r("ak3Em"),a=r("9hCqF"),u=r("9Zsfg");let l=Object.create(null),c=new Map,d=0;function f({template:e,bits:t}){let r=p(e,t);if(l[r])return l[r];let{vertex:o,fragment:i}=function(e,t){let r=t.map(e=>e.vertex).filter(e=>!!e),o=t.map(e=>e.fragment).filter(e=>!!e),i=(0,s.compileInputs)(r,e.vertex,!0);return{vertex:i=(0,a.compileOutputs)(r,i),fragment:(0,s.compileInputs)(o,e.fragment,!0)}}(e,t);return l[r]=h(o,i,t),l[r]}function m({template:e,bits:t}){let r=p(e,t);return l[r]||(l[r]=h(e.vertex,e.fragment,t)),l[r]}function p(e,t){return t.map(e=>(c.has(e)||c.set(e,d++),c.get(e))).sort((e,t)=>e-t).join("-")+e.vertex+e.fragment}function h(e,t,r){let o=(0,n.compileHooks)(e),s=(0,n.compileHooks)(t);return r.forEach(e=>{(0,i.addBits)(e.vertex,o,e.name),(0,i.addBits)(e.fragment,s,e.name)}),{vertex:(0,u.injectBits)(e,o),fragment:(0,u.injectBits)(t,s)}}}),o("9zLXd",function(t,o){e(t.exports,"addBits",()=>n);var i=r("hUCK4");function n(e,t,r){if(e)for(let o in e){let n=t[o.toLocaleLowerCase()];if(n){let t=e[o];"header"===o&&(t=t.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),r&&n.push(`//----${r}----//`),n.push(t)}else(0,i.warn)(`${o} placement hook does not exist in shader`)}}}),o("jJet4",function(t,r){e(t.exports,"compileHooks",()=>i);let o=/\{\{(.*?)\}\}/g;function i(e){let t={};return(e.match(o)?.map(e=>e.replace(/[{()}]/g,""))??[]).forEach(e=>{t[e]=[]}),t}}),o("ak3Em",function(t,r){function o(e,t){let r;let o=/@in\s+([^;]+);/g;for(;null!==(r=o.exec(e));)t.push(r[1])}function i(e,t,r=!1){let i=[];o(t,i),e.forEach(e=>{e.header&&o(e.header,i)}),r&&i.sort();let n=i.map((e,t)=>`       @location(${t}) ${e},`).join("\n");return t.replace(/@in\s+[^;]+;\s*/g,"").replace("{{in}}",`
${n}
`)}e(t.exports,"compileInputs",()=>i)}),o("9hCqF",function(t,r){function o(e,t){let r;let o=/@out\s+([^;]+);/g;for(;null!==(r=o.exec(e));)t.push(r[1])}function i(e,t){let r=[];o(t,r),e.forEach(e=>{e.header&&o(e.header,r)});let i=0,n=r.sort().map(e=>e.indexOf("builtin")>-1?e:`@location(${i++}) ${e}`).join(",\n"),s=r.sort().map(e=>`       var ${e.replace(/@.*?\s+/g,"")};`).join("\n"),a=`return VSOutput(
                ${r.sort().map(e=>` ${function(e){let t=/\b(\w+)\s*:/g.exec(e);return t?t[1]:""}(e)}`).join(",\n")});`,u=t.replace(/@out\s+[^;]+;\s*/g,"");return(u=(u=u.replace("{{struct}}",`
${n}
`)).replace("{{start}}",`
${s}
`)).replace("{{return}}",`
${a}
`)}e(t.exports,"compileOutputs",()=>i)}),o("9Zsfg",function(t,r){e(t.exports,"injectBits",()=>o);function o(e,t){let r=e;for(let e in t){let o=t[e];r=o.join("\n").length?r.replace(`{{${e}}}`,`//-----${e} START-----//
${o.join("\n")}
//----${e} FINISH----//`):r.replace(`{{${e}}}`,"")}return r}}),o("jOJh1",function(t,r){e(t.exports,"vertexGPUTemplate",()=>o),e(t.exports,"fragmentGPUTemplate",()=>i),e(t.exports,"vertexGlTemplate",()=>n),e(t.exports,"fragmentGlTemplate",()=>s);let o=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,i=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,n=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,s=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`}),o("8hMvn",function(t,r){e(t.exports,"globalUniformsBit",()=>o),e(t.exports,"globalUniformsBitGl",()=>i);let o={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},i={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}}}),o("cNnNT",function(t,r){e(t.exports,"colorBit",()=>o),e(t.exports,"colorBitGl",()=>i);let o={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},i={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}}}),o("ikSZA",function(t,r){e(t.exports,"generateTextureBatchBit",()=>i),e(t.exports,"generateTextureBatchBitGl",()=>s);let o={};function i(e){return o[e]||(o[e]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;
    
                ${function(e){let t=[];{let e=0;for(let r=0;r<16;r++)t.push(`@group(1) @binding(${e++}) var textureSource${r+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${e++}) var textureSampler${r+1}: sampler;`)}return t.join("\n")}(0)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${function(e){let t=[];t.push("switch vTextureId {");for(let e=0;e<16;e++)15===e?t.push("  default:{"):t.push(`  case ${e}:{`),t.push(`      outColor = textureSampleGrad(textureSource${e+1}, textureSampler${e+1}, vUV, uvDx, uvDy);`),t.push("      break;}");return t.push("}"),t.join("\n")}(16)}
            `}}),o[e]}let n={};function s(e){return n[e]||(n[e]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;
              
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;
    
                uniform sampler2D uTextures[${e}];
              
            `,main:`
    
                ${function(e){let t=[];for(let e=0;e<16;e++)e>0&&t.push("else"),e<15&&t.push(`if(vTextureId < ${e}.5)`),t.push("{"),t.push(`	outColor = texture(uTextures[${e}], vUV);`),t.push("}");return t.join("\n")}(0)}
            `}}),n[e]}}),o("kSpdC",function(t,r){e(t.exports,"roundPixelsBit",()=>o),e(t.exports,"roundPixelsBitGl",()=>i);let o={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},i={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}}}),o("5iDyo",function(o,i){e(o.exports,"Shader",()=>d);var n=r("3vRz3"),s=r("fK92B"),a=r("awcfo"),u=r("6j7wq"),l=r("2bK9z"),c=r("cryyq");class d extends t(n){constructor(e){super(),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:t,glProgram:r,groups:o,resources:i,compatibleRenderers:n,groupMap:s}=e;this.gpuProgram=t,this.glProgram=r,void 0===n&&(n=0,t&&(n|=l.RendererType.WEBGPU),r&&(n|=l.RendererType.WEBGL)),this.compatibleRenderers=n;let u={};if(i||o||(i={}),i&&o)throw Error("[Shader] Cannot have both resources and groups");if(t||!o||s){if(!t&&o&&s)for(let e in s)for(let t in s[e]){let r=s[e][t];u[r]={group:e,binding:t,name:r}}else if(t&&o&&!s){let e=t.structsAndGroups.groups;s={},e.forEach(e=>{s[e.group]=s[e.group]||{},s[e.group][e.binding]=e.name,u[e.name]=e})}else if(i){if(t){let e=t.structsAndGroups.groups;s={},e.forEach(e=>{s[e.group]=s[e.group]||{},s[e.group][e.binding]=e.name,u[e.name]=e})}else{s={},o={99:new a.BindGroup},this._ownedBindGroups.push(o[99]);let e=0;for(let t in i)u[t]={group:99,binding:e,name:t},s[99]=s[99]||{},s[99][e]=t,e++}for(let e in o={},i){let t=i[e];t.source||t._resourceType||(t=new c.UniformGroup(t));let r=u[e];r&&(o[r.group]||(o[r.group]=new a.BindGroup,this._ownedBindGroups.push(o[r.group])),o[r.group].setResource(t,r.binding))}}}else throw Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");this.groups=o,this._uniformBindMap=s,this.resources=this._buildResourceAccessor(o,u)}addResource(e,t,r){var o,i;(o=this._uniformBindMap)[t]||(o[t]={}),(i=this._uniformBindMap[t])[r]||(i[r]=e),this.groups[t]||(this.groups[t]=new a.BindGroup,this._ownedBindGroups.push(this.groups[t]))}_buildResourceAccessor(e,t){let r={};for(let o in t){let i=t[o];Object.defineProperty(r,i.name,{get:()=>e[i.group].getResource(i.binding),set(t){e[i.group].setResource(t,i.binding)}})}return r}destroy(e=!1){this.emit("destroy",this),e&&(this.gpuProgram?.destroy(),this.glProgram?.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(e=>{e.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(e){let t,r;let{gpu:o,gl:i,...n}=e;return o&&(t=(0,u.GpuProgram).from(o)),i&&(r=(0,s.GlProgram).from(i)),new d({gpuProgram:t,glProgram:r,...n})}}}),o("2bK9z",function(t,r){e(t.exports,"RendererType",()=>i);var o,i=((o=i||{})[o.WEBGL=1]="WEBGL",o[o.WEBGPU=2]="WEBGPU",o[o.BOTH=3]="BOTH",o)}),o("huPGn",function(t,r){e(t.exports,"localUniformBit",()=>o),e(t.exports,"localUniformBitGroup2",()=>i),e(t.exports,"localUniformBitGl",()=>n);let o={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},i={...o,vertex:{...o.vertex,header:o.vertex.header.replace("group(1)","group(2)")}},n={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}}});
//# sourceMappingURL=browserAll.eab7d6c4.js.map
