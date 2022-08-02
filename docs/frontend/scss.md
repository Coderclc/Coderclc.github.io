# [Scss](https://www.sass.hk/)

## syntax format

Scss uses curly braces, Sass indents instead of curly braces

Any format can be directly [imported (@import)](https://www.sass.hk/docs/#t7-1) to another format for use, or converted via the `sass-convert` command-line tool into another format:

## variable declaration

Variables start with a dollar sign

```scss
$highlight-color: #f90;
$basic-border: 1px solid black;
```

## variable reference

```scss
div {
  border: 1px solid $highlight-color;
}
```

## Use underscore or underscore for variable names

```scss
// both
$link-color: blue;

a {
  color: $link_color;
}
```

## nested

### Parent selector identifier &

```html
<div class="bullshit">
  <div class="bullshit__oops">OOPS!</div>
  <div class="bullshit--info">All rights reserved</div>
</div>
```

```scss
.bullshit {
  &\_\_oops {
  }
  &--info {
  }
}
```

### Nesting of group selectors

```scss
.container {
  h1,
  h2,
  h3 {
    margin-bottom: 0.8em;
  }
}
```

### Combining selectors: >, + and ~

```scss
article {
  ~ article {
    border-top: 1px dashed #ccc;
  }

  \>section {
    background: #eee;
  }

  nav + & {
    margin-top: 0;
  }
}
```

### Nested properties

```scss
border: {
  style: solid;
  width: 1px;
  color: #ccc;
  top: 0;
}

border: 1px solid #008c8c {
  left: 0px;
} ;
```

## Import Scss file

Compare css without initiating an additional download request

No need to specify the full name of the imported file

## Use Scss section file

Don't want scss files to be compiled into css files separately

Add \_ eg:themes/\_night-sky.scss when scss is named, it will not be compiled into css separately at this time

@import 'themes/night-sky' ignores \_ ext

## Default variable value

!default

## Nested imports

```scss
.blue-theme {
  @import 'blue-theme';
}
```

Equivalent to compiling the content and putting it there

## Native CSS import

Just change css to scss file

## silent comment

```scss
main {
  color/* This kind of comment content will appear in the generated css file */: #f00; // This kind of comment content will not appear in the generated css file
  padding: 10px; /* This comment will appear in the generated css file */
}

// compiled css

main {
  color/* This comment content will appear in the generated css file */: #f00;
  padding: 10px;
  /* This comment will appear in the generated css file */
}
```

## mixer

```scss
@mixin name {
}
@include name;
```

A lot of reuse can lead to oversized stylesheets, avoiding abuse

## CSS rules in mixers

```scss
@mixin name {
  ul li {
  }
}
```

## pass parameters to the mixer

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}

a {
  @include link-colors(blue, red, green);
}
```

\$name: value specifies the parameter

```scss
a {
  @include link-colors($normal: blue, $visited: green, $hover: red);
}
```

## default parameter values;

```scss
@mixin link-colors($normal, $hover: $normal, $visited: $normal) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}

@include link-colors(red);
```

## inheritance

@extend

```scss
.error {
  border: 1px solid red;
  background-color: #fdd;
  a {
  }
}
.seriousError {
  @extend.error;
  border-width: 3px;
  a {
  }
}
```

The mixer puts the styles directly into the `css` rules, and inheritance has the problem of style cascading

That is, `error a {...}` will also be inherited to `seriousError a{}`

## Advanced usage of inheritance

Inherit the styles of an `html` element

```scss
.disabled {
  color: gray;
  @extend a;
}
```

## Vue files use variables from scss files

```scss
:export {
  menuText: $menuText;
  menuActiveText: $menuActiveText;
  subMenuActiveText: $subMenuActiveText;
  menuBg: $menuBg;
  menuHover: $menuHover;
  subMenuBg: $subMenuBg;
  subMenuHover: $subMenuHover;
  sideBarWidth: $sideBarWidth;
}
```

```js
import variables from '@/styles/variables.scss'

computed: {
    variables() {
        return variables
    }
},
mounted() {
    console.log(variables)
},
```
