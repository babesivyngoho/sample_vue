function f(t,l){let i=!1;for(let e=0;e<t.length;e++)if(t[e].title===l.title){t[e].disabled=!0,t.length=e+1,i=!0;break}return i||t.push(l),t}export{f as u};
