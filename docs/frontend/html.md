# Html

## [Html5](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

## Review

- [<!DOCTYPE>](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) In HTML, the declaration of the document type doctype is necessary. In the head of all documents, you will see him. The purpose of this statement is to prevent the browser from switching to a rendering mode we call "weird mode (compatibility mode)" when rendering the document. To ensure that the browser is rendering according to the best relevant specifications, instead of using a rendering mode that does not conform to the specification.

- Difference between HTML and XHTML

  - HTML is stricter than HTML in terms of syntax and case sensitivity
  - XHTML elements must be properly nested
  - XHTML elements must be properly closed
  - XHTML tag names must be in lowercase letters
  - XHTML document must have root element
  - xhtml requires `img` to be added with alt attribute,

- Lang global attribute, participates in the definition of element language. [value](https://www.w3schools.com/tags/ref_language_codes.asp) is defined by IETF. `lang="zh-CN"` is obsolete `lang= "zh-cmn-Hans" `Official language in mainland China in simplified Chinese

- Meta `<meta>` document original data, `charset="UTF-8"` character encoding

- When the protocol name of the opened url is the same as the original protocol name, the protocol name can be omitted

- browser script can add type=module to support esmodule
