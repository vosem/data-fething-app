(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,r){e.exports=r.p+"static/media/no_poster.eac23845.jpg"},25:function(e,t,r){e.exports=r(42)},35:function(e,t,r){},36:function(e,t,r){},37:function(e,t,r){},38:function(e,t,r){},39:function(e,t,r){},40:function(e,t,r){},41:function(e,t,r){},42:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),s=r(6),o=r.n(s),c=r(4),u=r(20),i=r(21),p=r(2),l=r(24),h=Object(c.c)({postersState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_POSTER_SUCCESS":return Object.assign({},e,{posters:[].concat(Object(l.a)(e.posters||[]),[{poster:t.payload}])});default:return e}},showsState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_SHOWS_SUCCESS":case"SEARCH_SHOWS_SUCCESS":return Object(p.a)({},e,{shows:t.payload});default:return e}},queryState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GENERATE_SORTING_QUERY":return Object.assign({},e,{queries:Object(p.a)({},e.queries,{sorting:t.payload})});case"GENERATE_TITLE_QUERY":return Object.assign({},e,{queries:Object(p.a)({},e.queries,{title:t.payload})});case"GENERATE_YEAR_QUERY":return Object.assign({},e,{queries:Object(p.a)({},e.queries,{year:t.payload})});case"GENERATE_PAGE_QUERY":case"GENERATE_PREV_PAGE_QUERY":case"GENERATE_NEXT_PAGE_QUERY":case"FETCH_CURRENT_PAGE":return Object.assign({},e,{queries:Object(p.a)({},e.queries,{page:t.payload})});case"FETCH_PAGES_QUANTITY":return Object.assign({},e,{queries:Object(p.a)({},e.queries,{pagesTotal:t.payload})});default:return e}}}),f=(Object(u.createLogger)(),window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||c.d),d=Object(c.e)(h,f(Object(c.a)(i.a))),y=r(11),E=r(8),g=r(9),m=r(13),S=r(10),b=r(5),w=r(12),v=r(1),T=r.n(v),O=r(3),j=function(e){return{type:"FETCH_SHOWS_SUCCESS",payload:e}};function _(e){return{type:"FETCH_PAGES_QUANTITY",payload:e}}r(35);var R=function(e){return n.a.createElement("input",{className:"search-by-title",type:"text",placeholder:"Title",onFocus:function(e){return e.target.placeholder=""},onBlur:function(e){return e.target.placeholder="Title"},onKeyUp:function(t){e.fetchShowsByTitle(t.target.value)}})};r(36);var x=function(e){return n.a.createElement("input",{className:"search-by-year",type:"text",placeholder:"Year",onFocus:function(e){return e.target.placeholder=""},onBlur:function(e){return e.target.placeholder="Year"},onKeyUp:function(t){return e.fetchShowsByYear(t.target.value)}})};r(37);var P=function(e){return n.a.createElement("select",{className:"sort-shows",name:"sortShows",defaultValue:"popular",onChange:function(t){return e.fetchShowsBySorting(t.target.value)},style:{width:"100%"}},n.a.createElement("option",{value:"popular"},"popular"),n.a.createElement("option",{value:"trending"},"trending"),n.a.createElement("option",{value:"played"},"played"),n.a.createElement("option",{value:"watched"},"watched"),n.a.createElement("option",{value:"anticipated"},"anticipated"))},N=(r(38),function(e){function t(){var e,r;Object(E.a)(this,t);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(r=Object(m.a)(this,(e=Object(S.a)(t)).call.apply(e,[this].concat(n)))).clearInput=function(){o.a.findDOMNode(r.refs.currentPageInput).value=""},r}return Object(w.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this,t=this.props.queries&&this.props.queries.pagesTotal||1,r=this.props.queries&&this.props.queries.page||1,a="Current page: ".concat(r);return n.a.createElement("div",{className:"pagination"},n.a.createElement("button",{disabled:r<2,value:r,onClick:function(){e.props.fetchShowsByPage(+r-1),e.clearInput()}},"<"),n.a.createElement("button",{disabled:"1"===r,onClick:function(){e.props.fetchShowsByPage(1),e.clearInput()}},"1"),n.a.createElement("input",{ref:"currentPageInput",type:"text",placeholder:a,onFocus:function(e){return e.target.placeholder=""},onBlur:function(e){return e.target.placeholder=a},onKeyUp:function(t){e.props.fetchShowsByEnteredPage(t.target.value),setTimeout(function(){e.clearInput()},5e3)}}),n.a.createElement("button",{value:t,onClick:function(){e.props.fetchShowsByPage(t),e.clearInput()}},"Last page: ",t),n.a.createElement("button",{disabled:r>t-1,value:r,onClick:function(){e.props.fetchShowsByPage(+r+1),e.clearInput()}},">"))}}]),t}(n.a.Component));var q=Object(y.b)(function(e){return{queries:e.queryState.queries}})(N);r(39);var k=function(e){return n.a.createElement("tr",{className:"show"},n.a.createElement("td",{className:"showNumber"},e.showNumber),n.a.createElement("td",{className:"showPoster"},n.a.createElement("img",{src:e.posterUrl,alt:e.posterAlt,height:"50px",onLoad:e.load.bind(this),onError:e.load.bind(this)})),n.a.createElement("td",{className:"title"},e.show.title),n.a.createElement("td",{className:"rating"},e.show.rating),n.a.createElement("td",{className:"year"},e.show.year),n.a.createElement("td",{className:"showId"},e.show.ids.tvdb),n.a.createElement("td",{className:"episodes"},e.show.aired_episodes))},C=r(23),B=r.n(C),Q=function(e){function t(e){return Object(E.a)(this,t),Object(m.a)(this,Object(S.a)(t).call(this,e))}return Object(w.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e,t,r,a=this,s=this.props.shows,o=this.props.queries?10*(this.props.queries.page-1):1;return s=s&&s.map(function(s,c){o++,a.props.posters&&((t=a.props.posters.filter(function(e){return e.poster.thetvdb_id===s.ids.tvdb.toString()}))[0]&&t[0].poster.tvposter?(e=t[0].poster.tvposter[0].url,r=e):(e=B.a,r="no poster"));var u=function(){0};return n.a.createElement(k,{posters:a.props.posters,posterUrl:e,posterAlt:r,key:c+1,showNumber:o,show:s,load:u,error:u})}),n.a.createElement("tbody",null,s)}}]),t}(n.a.Component);r(40);function U(e){return A.apply(this,arguments)}function A(){return(A=Object(O.a)(T.a.mark(function e(t){var r,a,n,s,o,c,u,i,l,h,f,d,y,E,g;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=(r=t||{}).title,n=r.year,s=r.sorting,o=r.page,c=r.limit,u=(s&&"popular"!==s?["shows",s]:["search","show"]).join("/"),i={extended:"full",query:a||"",fields:"title",years:n,page:o||0,limit:c||10},l=Object.keys(i).filter(function(e){return"query"===e||i[e]}).map(function(e){return[e,i[e]].map(function(e){return encodeURIComponent(e)}).join("=")}).join("&"),h="https://api.trakt.tv/".concat(u,"?").concat(l),f={"Content-Type":"application/json","trakt-api-version":"2","trakt-api-key":"31f15cbdee3e55e2ceca6cd2e0e3ba9791b4f1feb1f7bab08c3d8ca6e018609a"},e.next=8,fetch(h,{headers:f});case 8:return d=e.sent,e.next=11,d.json();case 11:return y=(y=e.sent).map(function(e){var t=e||{},r=t.score,a=t.show,n=t.type;return Object(p.a)({score:r,type:n},a)}),E=d.headers.get("x-pagination-page"),g=d.headers.get("x-pagination-page-count"),e.abrupt("return",{json:y,currentPage:E,pagesTotal:g});case 16:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Y(e){return G.apply(this,arguments)}function G(){return(G=Object(O.a)(T.a.mark(function e(t){var r,a,n,s,o,c,u;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=["v3","tv",t].join("/"),a={api_key:"ab75dec43906f846e6200633b9ad43c7",client_key:"4c61b1676e8869c4553df95839f5a827"},n=Object.keys(a).filter(function(e){return a[e]}).map(function(e){return[e,a[e]].map(function(e){return encodeURIComponent(e)}).join("=")}).join("&"),s="http://private-anon-d2c67a30e4-fanarttv.apiary-proxy.com/".concat(r,"?").concat(n),o={"Content-Type":"application/json"},e.next=7,fetch(s,{headers:o});case 7:return c=e.sent,e.next=10,c.json();case 10:return u=e.sent,e.abrupt("return",u);case 12:case"end":return e.stop()}},e)}))).apply(this,arguments)}var I=function(e){function t(e){var r;return Object(E.a)(this,t),(r=Object(m.a)(this,Object(S.a)(t).call(this,e))).fetchPosters=Object(O.a)(T.a.mark(function e(){var t,a;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=d.getState().showsState.shows||[],a=d.getState().postersState.posters,e.next=4,t.forEach(function(e){return a&&0!==a.filter(function(t){return+t.poster.thetvdb_id===e.ids.tvdb}).length?void 0:r.props.fetchPosterWithRedux(e.ids.tvdb)});case 4:case"end":return e.stop()}},e)})),r.fetchShowsByTitle=function(e){clearTimeout(r.typingTimer),e&&(r.typingTimer=setTimeout(Object(O.a)(T.a.mark(function t(){var a;return T.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r.generateTitleQuery(e),r.generatePageQuery(1),a=d.getState().queryState.queries,t.next=5,r.props.fetchShowsWithRedux(a);case 5:r.fetchPosters();case 6:case"end":return t.stop()}},t)})),1e3))},r.fetchShowsByYear=function(e){clearTimeout(r.typingTimer),e&&(r.typingTimer=setTimeout(Object(O.a)(T.a.mark(function t(){var a;return T.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!isNaN(e)){t.next=4;break}alert("Sorry. There should be a four-digit-number!"),t.next=10;break;case 4:return r.generateYearQuery(e),r.generatePageQuery(1),a=d.getState().queryState.queries,t.next=9,r.props.fetchShowsWithRedux(a);case 9:r.fetchPosters();case 10:case"end":return t.stop()}},t)})),1e3))},r.fetchShowsBySorting=function(){var e=Object(O.a)(T.a.mark(function e(t){var a;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r.props.generateSortingQuery(t),r.props.generatePageQuery(1),a=d.getState().queryState.queries,e.next=5,r.props.fetchShowsWithRedux(a);case 5:r.fetchPosters();case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),r.fetchShowsByPage=function(){var e=Object(O.a)(T.a.mark(function e(t){var a;return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r.props.generatePageQuery(t),a=d.getState().queryState.queries,e.next=4,r.props.fetchShowsWithRedux(a);case 4:r.fetchPosters();case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),r.fetchShowsByEnteredPage=function(e){clearTimeout(r.typingTimer),e&&(r.typingTimer=setTimeout(Object(O.a)(T.a.mark(function t(){var a,n;return T.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!isNaN(e)){t.next=4;break}alert("Sorry. There should be a number!"),t.next=12;break;case 4:return a=+d.getState().queryState.queries.pagesTotal,e=+(e=+e>a?a:e)<1?1:e,r.generatePageQuery(e),n=d.getState().queryState.queries,t.next=11,r.props.fetchShowsWithRedux(n);case 11:r.fetchPosters();case 12:case"end":return t.stop()}},t)})),1e3))},r.generateTitleQuery=r.props.generateTitleQuery.bind(Object(b.a)(r)),r.generateYearQuery=r.props.generateYearQuery.bind(Object(b.a)(r)),r.generatePageQuery=r.props.generatePageQuery.bind(Object(b.a)(r)),r.typingTimer=0,r.state={contentReady:!1},r}return Object(w.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){var e=Object(O.a)(T.a.mark(function e(){return T.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.props.fetchShowsWithRedux();case 2:return e.next=4,this.fetchPosters();case 4:this.setState({contentReady:!0});case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement(q,{fetchShowsByPage:this.fetchShowsByPage,fetchShowsByEnteredPage:this.fetchShowsByEnteredPage}),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("td",{colSpan:"2"},n.a.createElement(P,{fetchShowsBySorting:this.fetchShowsBySorting})),n.a.createElement("td",null,n.a.createElement(R,{fetchShowsByTitle:this.fetchShowsByTitle})),n.a.createElement("td",null,"Rank"),n.a.createElement("td",null,n.a.createElement(x,{fetchShowsByYear:this.fetchShowsByYear})),n.a.createElement("td",null,"TVDB Id"),n.a.createElement("td",null,"No of",n.a.createElement("br",null),"Episodes"))),n.a.createElement(Q,{posters:this.props.posters,shows:this.props.shows,queries:this.props.queries})),n.a.createElement(q,{fetchShowsByPage:this.fetchShowsByPage,fetchShowsByEnteredPage:this.fetchShowsByEnteredPage}))}}]),t}(n.a.Component);var H=Object(y.b)(function(e){return{posters:e.postersState.posters,shows:e.showsState.shows,queries:e.queryState.queries}},{fetchPosterWithRedux:function(e){return function(){var t=Object(O.a)(T.a.mark(function t(r){var a;return T.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Y(e);case 3:a=t.sent,r({type:"FETCH_POSTER_SUCCESS",payload:a}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),r({type:"FETCH_POSTER_ERROR"});case 10:case"end":return t.stop()}},t,null,[[0,7]])}));return function(e){return t.apply(this,arguments)}}()},fetchShowsWithRedux:function(e){return function(){var t=Object(O.a)(T.a.mark(function t(r){var a,n,s,o;return T.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,U(e);case 3:a=t.sent,n=a.json,s=a.currentPage,o=a.pagesTotal,r(j(n)),r({type:"FETCH_CURRENT_PAGE",payload:s}),r(_(o)),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),r({type:"FETCH_SHOWS_ERROR"});case 15:case"end":return t.stop()}},t,null,[[0,12]])}));return function(e){return t.apply(this,arguments)}}()},generateTitleQuery:function(e){return{type:"GENERATE_TITLE_QUERY",payload:e}},generateYearQuery:function(e){return{type:"GENERATE_YEAR_QUERY",payload:e}},generateSortingQuery:function(e){return{type:"GENERATE_SORTING_QUERY",payload:e}},generatePageQuery:function(e){return{type:"GENERATE_PAGE_QUERY",payload:e}}})(I);r(41);o.a.render(n.a.createElement("div",null,n.a.createElement(y.a,{store:d},n.a.createElement(H,null))),document.getElementById("root"))}},[[25,1,2]]]);
//# sourceMappingURL=main.eb641dfb.chunk.js.map