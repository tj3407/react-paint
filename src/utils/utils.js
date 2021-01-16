export const moveCaretToEnd = (el) => {
  if (typeof el.selectionStart == "number") {
    el.selectionStart = el.selectionEnd = el.value.length - 1;
  } else if (typeof el.createTextRange != "undefined") {
    el.focus();
    var range = el.createTextRange();
    range.collapse(false);
    range.select();
  }
};

export const moveCaretToPosition = (el, position) => {
  el.setSelectionRange(position - 2, position - 2);
};
