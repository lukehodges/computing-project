```js
function hs(options) {
    lst = options[:3]
    get the sum of the ascii values
    let s = 0
    for (var i = 0; i < 3;i++){
        s += options[i].toASCII()
    }

}
```
```python
def hash(siteName):
    ww, siteName, reg = siteName.split(".") # wwww.fdsfds.com
    initial = 0
    p = locate(".")
    for i in range(3):
        initial = initial + upper(siteName[i+p].upper())
    return i
```