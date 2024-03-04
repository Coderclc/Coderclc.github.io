import{_ as e,o as p,c as o,a as s,b as l,d as a,e as c,r}from"./app.a81d06d1.js";const D={},t={id:"scss",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#scss","aria-hidden":"true"},"#",-1),y=a(),d={href:"https://www.sass.hk/",target:"_blank",rel:"noopener noreferrer"},h=a("Scss"),C=s("h2",{id:"syntax-format",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#syntax-format","aria-hidden":"true"},"#"),a(" syntax format")],-1),u=s("p",null,"Scss uses curly braces, Sass indents instead of curly braces",-1),E=a("Any format can be directly "),m={href:"https://www.sass.hk/docs/#t7-1",target:"_blank",rel:"noopener noreferrer"},v=a("imported (@import)"),g=a(" to another format for use, or converted via the "),b=s("code",null,"sass-convert",-1),f=a(" command-line tool into another format:"),x=c(`<h2 id="variable-declaration" tabindex="-1"><a class="header-anchor" href="#variable-declaration" aria-hidden="true">#</a> variable declaration</h2><p>Variables start with a dollar sign</p><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#9CDCFE;">$highlight-color</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">#f90</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#9CDCFE;">$basic-border</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">1px</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">solid</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">black</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="variable-reference" tabindex="-1"><a class="header-anchor" href="#variable-reference" aria-hidden="true">#</a> variable reference</h2><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D7BA7D;">div</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">border</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">1px</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">solid</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">$highlight-color</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="use-underscore-or-underscore-for-variable-names" tabindex="-1"><a class="header-anchor" href="#use-underscore-or-underscore-for-variable-names" aria-hidden="true">#</a> Use underscore or underscore for variable names</h2><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#6A9955;">// both</span></span>
<span class="line"><span style="color:#9CDCFE;">$link-color</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">blue</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D7BA7D;">a</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">$link_color</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="nested" tabindex="-1"><a class="header-anchor" href="#nested" aria-hidden="true">#</a> nested</h2><h3 id="parent-selector-identifier" tabindex="-1"><a class="header-anchor" href="#parent-selector-identifier" aria-hidden="true">#</a> Parent selector identifier &amp;</h3><div class="language-html ext-html"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">div</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">class</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&quot;bullshit&quot;</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">div</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">class</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&quot;bullshit__oops&quot;</span><span style="color:#808080;">&gt;</span><span style="color:#D4D4D4;">OOPS!</span><span style="color:#808080;">&lt;/</span><span style="color:#569CD6;">div</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#808080;">&lt;</span><span style="color:#569CD6;">div</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">class</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&quot;bullshit--info&quot;</span><span style="color:#808080;">&gt;</span><span style="color:#D4D4D4;">All rights reserved</span><span style="color:#808080;">&lt;/</span><span style="color:#569CD6;">div</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#808080;">&lt;/</span><span style="color:#569CD6;">div</span><span style="color:#808080;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D7BA7D;">.bullshit</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#569CD6;">&amp;</span><span style="color:#9CDCFE;">\\_\\_oops</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#569CD6;">&amp;</span><span style="color:#9CDCFE;">--info</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="nesting-of-group-selectors" tabindex="-1"><a class="header-anchor" href="#nesting-of-group-selectors" aria-hidden="true">#</a> Nesting of group selectors</h3><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D7BA7D;">.container</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#D7BA7D;">h1</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#D7BA7D;">h2</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#D7BA7D;">h3</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">margin-bottom</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">0.8em</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="combining-selectors-and" tabindex="-1"><a class="header-anchor" href="#combining-selectors-and" aria-hidden="true">#</a> Combining selectors: &gt;, + and ~</h3><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D7BA7D;">article</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  ~ </span><span style="color:#D7BA7D;">article</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">border-top</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">1px</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">dashed</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">#ccc</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">  \\&gt;</span><span style="color:#D7BA7D;">section</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">background</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">#eee</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#D7BA7D;">nav</span><span style="color:#D4D4D4;"> + </span><span style="color:#569CD6;">&amp;</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">margin-top</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="nested-properties" tabindex="-1"><a class="header-anchor" href="#nested-properties" aria-hidden="true">#</a> Nested properties</h3><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">border: {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#D7BA7D;">style</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">solid</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">width</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">1px</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">#ccc</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">top</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">border: 1px solid </span><span style="color:#D7BA7D;">#008c8c</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">left</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">0px</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">} ;</span></span>
<span class="line"></span></code></pre></div><h2 id="import-scss-file" tabindex="-1"><a class="header-anchor" href="#import-scss-file" aria-hidden="true">#</a> Import Scss file</h2><p>Compare css without initiating an additional download request</p><p>No need to specify the full name of the imported file</p><h2 id="use-scss-section-file" tabindex="-1"><a class="header-anchor" href="#use-scss-section-file" aria-hidden="true">#</a> Use Scss section file</h2><p>Don&#39;t want scss files to be compiled into css files separately</p><p>Add _ eg:themes/_night-sky.scss when scss is named, it will not be compiled into css separately at this time</p><p>@import &#39;themes/night-sky&#39; ignores _ ext</p><h2 id="default-variable-value" tabindex="-1"><a class="header-anchor" href="#default-variable-value" aria-hidden="true">#</a> Default variable value</h2><p>!default</p><h2 id="nested-imports" tabindex="-1"><a class="header-anchor" href="#nested-imports" aria-hidden="true">#</a> Nested imports</h2><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D7BA7D;">.blue-theme</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#C586C0;">@import</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;blue-theme&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><p>Equivalent to compiling the content and putting it there</p><h2 id="native-css-import" tabindex="-1"><a class="header-anchor" href="#native-css-import" aria-hidden="true">#</a> Native CSS import</h2><p>Just change css to scss file</p><h2 id="silent-comment" tabindex="-1"><a class="header-anchor" href="#silent-comment" aria-hidden="true">#</a> silent comment</h2><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D7BA7D;">main</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">color</span><span style="color:#6A9955;">/* This kind of comment content will appear in the generated css file */</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">#f00</span><span style="color:#D4D4D4;">; </span><span style="color:#6A9955;">// This kind of comment content will not appear in the generated css file</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">padding</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">10px</span><span style="color:#D4D4D4;">; </span><span style="color:#6A9955;">/* This comment will appear in the generated css file */</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">// compiled css</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D7BA7D;">main</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">color</span><span style="color:#6A9955;">/* This comment content will appear in the generated css file */</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">#f00</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">padding</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">10px</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#6A9955;">/* This comment will appear in the generated css file */</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="mixer" tabindex="-1"><a class="header-anchor" href="#mixer" aria-hidden="true">#</a> mixer</h2><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">@mixin</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">name</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"><span style="color:#C586C0;">@include</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">name</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span></code></pre></div><p>A lot of reuse can lead to oversized stylesheets, avoiding abuse</p><h2 id="css-rules-in-mixers" tabindex="-1"><a class="header-anchor" href="#css-rules-in-mixers" aria-hidden="true">#</a> CSS rules in mixers</h2><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">@mixin</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">name</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#D7BA7D;">ul</span><span style="color:#D4D4D4;"> </span><span style="color:#D7BA7D;">li</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="pass-parameters-to-the-mixer" tabindex="-1"><a class="header-anchor" href="#pass-parameters-to-the-mixer" aria-hidden="true">#</a> pass parameters to the mixer</h2><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">@mixin</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">link-colors</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">$normal</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">$hover</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">$visited</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">$normal</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#569CD6;">&amp;</span><span style="color:#D7BA7D;">:hover</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">$hover</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#569CD6;">&amp;</span><span style="color:#D7BA7D;">:visited</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">$visited</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D7BA7D;">a</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#C586C0;">@include</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">link-colors</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">blue</span><span style="color:#D4D4D4;">, </span><span style="color:#CE9178;">red</span><span style="color:#D4D4D4;">, </span><span style="color:#CE9178;">green</span><span style="color:#D4D4D4;">);</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><p>$name: value specifies the parameter</p><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D7BA7D;">a</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#C586C0;">@include</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">link-colors</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">$normal</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">blue</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">$visited</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">green</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">$hover</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">red</span><span style="color:#D4D4D4;">);</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="default-parameter-values" tabindex="-1"><a class="header-anchor" href="#default-parameter-values" aria-hidden="true">#</a> default parameter values;</h2><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">@mixin</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">link-colors</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">$normal</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">$hover</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">$normal</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">$visited</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">$normal</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">$normal</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#569CD6;">&amp;</span><span style="color:#D7BA7D;">:hover</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">$hover</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#569CD6;">&amp;</span><span style="color:#D7BA7D;">:visited</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#9CDCFE;">$visited</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">@include</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">link-colors</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">red</span><span style="color:#D4D4D4;">);</span></span>
<span class="line"></span></code></pre></div><h2 id="inheritance" tabindex="-1"><a class="header-anchor" href="#inheritance" aria-hidden="true">#</a> inheritance</h2><p>@extend</p><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D7BA7D;">.error</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">border</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">1px</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">solid</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">red</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">background-color</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">#fdd</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#D7BA7D;">a</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"><span style="color:#D7BA7D;">.seriousError</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#C586C0;">@extend</span><span style="color:#D7BA7D;">.error</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">border-width</span><span style="color:#D4D4D4;">: </span><span style="color:#B5CEA8;">3px</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#D7BA7D;">a</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><p>The mixer puts the styles directly into the <code>css</code> rules, and inheritance has the problem of style cascading</p><p>That is, <code>error a {...}</code> will also be inherited to <code>seriousError a{}</code></p><h2 id="advanced-usage-of-inheritance" tabindex="-1"><a class="header-anchor" href="#advanced-usage-of-inheritance" aria-hidden="true">#</a> Advanced usage of inheritance</h2><p>Inherit the styles of an <code>html</code> element</p><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D7BA7D;">.disabled</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">gray</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#C586C0;">@extend</span><span style="color:#D4D4D4;"> a;</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="vue-files-use-variables-from-scss-files" tabindex="-1"><a class="header-anchor" href="#vue-files-use-variables-from-scss-files" aria-hidden="true">#</a> Vue files use variables from scss files</h2><div class="language-scss ext-scss"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">:export {</span></span>
<span class="line"><span style="color:#D4D4D4;">  menuText: </span><span style="color:#9CDCFE;">$menuText</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  menuActiveText: </span><span style="color:#9CDCFE;">$menuActiveText</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  subMenuActiveText: </span><span style="color:#9CDCFE;">$subMenuActiveText</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  menuBg: </span><span style="color:#9CDCFE;">$menuBg</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  menuHover: </span><span style="color:#9CDCFE;">$menuHover</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  subMenuBg: </span><span style="color:#9CDCFE;">$subMenuBg</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  subMenuHover: </span><span style="color:#9CDCFE;">$subMenuHover</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  sideBarWidth: </span><span style="color:#9CDCFE;">$sideBarWidth</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-javascript ext-js"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">variables</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@/styles/variables.scss&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C8C8C8;">computed</span><span style="color:#D4D4D4;">: {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#DCDCAA;">variables</span><span style="color:#D4D4D4;">() {</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">variables</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"><span style="color:#D4D4D4;">},</span></span>
<span class="line"><span style="color:#DCDCAA;">mounted</span><span style="color:#D4D4D4;">() {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">console</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">log</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">variables</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">},</span></span>
<span class="line"></span></code></pre></div>`,55);function A(F,k){const n=r("ExternalLinkIcon");return p(),o("div",null,[s("h1",t,[i,y,s("a",d,[h,l(n)])]),C,u,s("p",null,[E,s("a",m,[v,l(n)]),g,b,f]),x])}var B=e(D,[["render",A],["__file","scss.html.vue"]]);export{B as default};
