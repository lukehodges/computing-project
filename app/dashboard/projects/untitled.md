write a python algorithm to traverse a linked list
```python
class Item(object):
    data:str
    next_item:Item
def traverse(item):
    temp = item
    while temp is not None:
        print(temp.data,temp.next_item)
        temp = temp.next_item

traverse(items.head)
```


```python
def AddToLinkedList(item, root):
    while item.value > root:
        root = root.next
    root.next, item.next = item, root.next
```


rules
update previus nodes pointer
update your own pointer to be the previous nodes pointer


