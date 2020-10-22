(this["webpackJsonpchord-detection"]=this["webpackJsonpchord-detection"]||[]).push([[0],{11:function(e,t,n){e.exports=n(19)},16:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a,r=n(0),s=n.n(r),i=n(8),o=n.n(i),c=(n(16),n(1)),u=n(2),m=n.n(u),l=n(4),f=function(e){var t=e.onMessage,n=e.onConnect,a=e.onDisconnect,i=Object(r.useState)([]),o=Object(c.a)(i,2),u=o[0],f=o[1],b=Object(r.useState)(0),d=Object(c.a)(b,2),v=d[0],k=d[1],h=Object(r.useState)(!1),g=Object(c.a)(h,2),j=g[0],p=g[1];Object(r.useEffect)((function(){Object(l.a)(m.a.mark((function e(){var t,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.requestMIDIAccess();case 2:t=e.sent,(n=function(){var e=t.inputs.values();f(Array.from(e))})(),t.onstatechange=function(){n()};case 6:case"end":return e.stop()}}),e)})))()}),[]);return s.a.createElement(s.a.Fragment,null,s.a.createElement("select",{onChange:function(e){return k(parseInt(e.currentTarget.value,10))},defaultValue:v,disabled:j},u.map((function(e,t){return s.a.createElement("option",{key:t,value:t},e.name)}))),s.a.createElement("button",{onClick:function(){j?(u[v].onmidimessage=function(){},p(!1),a&&a()):(n&&n(),p(!0),t&&(u[v].onmidimessage=function(e){return t(e.data)}))}},j?"Disconnect USB MIDI":"Connect USB MIDI"))},b="03b80e5a-ede8-4b33-a751-6ce34ec4c700",d=function(){var e=Object(l.a)(m.a.mark((function e(t){var n,r,s,i,o;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.bluetooth.requestDevice({filters:[{services:[b]}],optionalServices:[b]});case 3:if(i=e.sent,null===(n=i.gatt)||void 0===n?void 0:n.connected){e.next=10;break}return e.next=7,null===(r=i.gatt)||void 0===r?void 0:r.connect();case 7:e.t0=e.sent,e.next=11;break;case 10:e.t0=i.gatt;case 11:return a=e.t0,e.next=14,null===(s=a)||void 0===s?void 0:s.getPrimaryService(b);case 14:(o=e.sent)&&v(o,"7772e5db-3868-4112-a1a9-f2669d106bf3",t),e.next=21;break;case 18:e.prev=18,e.t1=e.catch(0),console.error(e.t1);case 21:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(l.a)(m.a.mark((function e(t,n,a){var r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.getCharacteristic(n);case 3:return r=e.sent,e.next=6,r.startNotifications();case 6:r.addEventListener("characteristicvaluechanged",(function(e){return k(e.currentTarget.value,a)})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,n,a){return e.apply(this,arguments)}}(),k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:console.log;if(3!==e.buffer.byteLength||254!==e.getUint8(2))for(var n,a=e.buffer.byteLength,r=2,s=0;;){if((n=e.getUint8(r))<128)return;for(s=r;s<a-1&&e.getUint8(s+1)<128;)s++;if(s-r<1)t(Uint8Array.from([n,0,0]));else if(s-r<2)t(Uint8Array.from([n,e.getUint8(r+1),0]));else if(s-r<3)t(Uint8Array.from([n,e.getUint8(r+1),e.getUint8(r+2)]));else switch(240&e.getUint8(r)){case 128:case 144:case 160:case 176:case 224:for(var i=r;i<s;i+=2)t(Uint8Array.from([n,e.getUint8(i+1),e.getUint8(i+2)]));break;case 192:case 208:for(var o=r;o<s;o+=1)t(Uint8Array.from([n,e.getUint8(o+1),0]))}if((r=s+2)>=a)return}},h=function(e){var t=e.onMessage,n=e.onConnect,i=e.onDisconnect,o=Object(r.useState)(!1),u=Object(c.a)(o,2),m=u[0],l=u[1],f=function(){m?(!function(){var e;(null===(e=a)||void 0===e?void 0:e.connected)&&a.disconnect()}(),l(!1),i&&i()):(n&&n(),l(!0),d(t))};return s.a.createElement(s.a.Fragment,null,s.a.createElement("button",{onClick:function(){return f()}},m?"Disconnect Bluetooth MIDI":"Connect Bluetooth MIDI"))},g=n(6),j=n(9),p=n(10),y=function(){function e(t){Object(j.a)(this,e),this.data=void 0,this.notes=void 0,this.data=t,this.notes=["C","D\u266d","D","E\u266d","E","F","G\u266d","G","A\u266d","A","B\u266d","B"]}return Object(p.a)(e,[{key:"run",value:function(e){var t=this,n=e.sort((function(e,t){return e-t})),a=n[0],r=this.getChords(n,a).filter((function(e,t,n){return n.indexOf(e)===t})),s=n.slice(1),i=this.getChords(s,a).filter((function(e,n,a){return!(a.indexOf(e)!==n)&&!t.chordExists(r,e)}));return{chords:r,slashedChords:i}}},{key:"chordExists",value:function(e,t){return e.some((function(e){return e===t}))}},{key:"getChords",value:function(e,t){var n=this;return this.getNoteInversions(e).reduce((function(e,a){var r=n.getRootNote(a),s=n.normalizeNotes(a,r),i=n.getPossibleChords(s,r,t%12);return e.concat(i)}),[])}},{key:"getNoteInversions",value:function(e){return e.reduce((function(t,n,a){return a?[].concat(Object(g.a)(t),[[].concat(Object(g.a)(t[a-1].slice(1)),[t[a-1][0]])]):[e]}),[])}},{key:"getRootNote",value:function(e){return e[0]%12}},{key:"normalizeNotes",value:function(e,t){var n=new Set;return e.forEach((function(e){n.add((e-t)%12)})),Array.from(n).sort((function(e,t){return e-t}))}},{key:"getPossibleChords",value:function(e,t,n){var a=e.reduce((function(e,t,n,a){if(0===n)return"1";var r=t-a[n-1]-1;return"".concat(e).concat("0".repeat(r),"1")}),"");a=a.padEnd(12,"0");var r=parseInt(a,2);if(isNaN(r))return[];var s=this.notes[t],i="undefined"!==typeof n?this.notes[n]:null;return this.data.reduce((function(e,t){if((r&t.mask)===t.bits){var n="".concat(s," ").concat(t.name);return i&&i!==s&&(n+=" / ".concat(i)),e.concat(n)}return e}),[])}}]),e}(),E=(n(18),new Set),O=new y([{name:"",mask:4095,bits:2192},{name:"maj7",mask:4079,bits:2177},{name:"maj9",mask:4079,bits:2689},{name:"maj11",mask:3567,bits:2241},{name:"maj13",mask:3503,bits:2181},{name:"6",mask:4079,bits:2180},{name:"6/9",mask:4079,bits:2692},{name:"maj\u266f11",mask:3562,bits:2208},{name:"maj7\u266d6",mask:3502,bits:2184},{name:"7",mask:4079,bits:2178},{name:"9",mask:4079,bits:2690},{name:"11",mask:3567,bits:2242},{name:"13",mask:3503,bits:2182},{name:"7\u266f11",mask:3563,bits:2210},{name:"7\u266d9",mask:3791,bits:3202},{name:"13\u266d9",mask:3791,bits:3206},{name:"7\u266f9",mask:4079,bits:2434},{name:"alt7",mask:2775,bits:2178},{name:"sus4",mask:4079,bits:2112},{name:"sus2",mask:4079,bits:2560},{name:"7sus4",mask:4079,bits:2114},{name:"9sus4",mask:4079,bits:2626},{name:"\u266d9sus",mask:4079,bits:3136},{name:"-",mask:4095,bits:2320},{name:"-7",mask:4079,bits:2306},{name:"-maj7",mask:3555,bits:2305},{name:"-6",mask:4079,bits:2308},{name:"-9",mask:4079,bits:2818},{name:"-11",mask:3567,bits:2370},{name:"-13",mask:3503,bits:2310},{name:"\xb0",mask:4095,bits:2336},{name:"\xb07",mask:4095,bits:2340},{name:"-7\u266d5",mask:2491,bits:2338},{name:"(no 3)",mask:4095,bits:2064},{name:"(no 3)maj7",mask:4095,bits:2065},{name:"(no 3)maj9",mask:4095,bits:2577},{name:"(no 3)7",mask:4095,bits:2066},{name:"(no 3)9",mask:4095,bits:2578},{name:"+",mask:4095,bits:2184},{name:"maj7\u266f5",mask:4095,bits:2185},{name:"maj7\u266f4",mask:4079,bits:2721},{name:"7\u266f5",mask:4095,bits:2186},{name:"7\u266f9",mask:4079,bits:2434},{name:"\u266d9sus",mask:4079,bits:3138},{name:"alt",mask:4079,bits:3498},{name:"add9",mask:4079,bits:2688},{name:"-add9",mask:4079,bits:2816}]),w=function(){var e=Object(r.useState)([]),t=Object(c.a)(e,2),n=t[0],a=t[1],i=Object(r.useState)([]),o=Object(c.a)(i,2),u=o[0],m=o[1],l=function(e){144===e[0]&&e[2]>0?(E.add(e[1]),b(E)):(128===e[0]||144===e[0]&&0===e[2])&&(E.delete(e[1]),b(E))},b=function(e){var t=Array.from(e);if(t.length<2)return a([]),void m([]);var n=O.run(t);a(n.chords),m(n.slashedChords)};return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"controls"},s.a.createElement(f,{onMessage:l}),s.a.createElement(h,{onMessage:l})),s.a.createElement("div",{className:"container-chords"},s.a.createElement("div",null,n.join("\n")),s.a.createElement("div",null,u.join("\n"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.ac8bb4ad.chunk.js.map