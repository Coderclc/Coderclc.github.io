# Python

## First, start

Name files and folders in lowercase, with underscores instead of spaces

`execute python main.py`

Easy to read > easy to write indent = 4 space lines no longer than 80 characters comments no longer than 72 characters operators with spaces around them

print(??,end='') nowrap

## Second, variables

Alphanumeric underscore starts, cannot start with numbers

Avoid capital letter variable names

Traceback: Traceback record. Point out the interpreter running error

str.title() capitalize the first character

str.upper() all characters uppercase

str.lower() all characters are lowercase

\t tab \n newline

rstrip() blank at the end lstrip() at the beginning strip() at both ends temporary

\+ - \* \ Use () to change the priority of the operation

str() int->str int() str->int

## 3. List

Plural list names are a good idea

index -1 is the last element of the list

append() add at the end

insert(index,el) anywhere

extend() is different from the insertion list, dictionary, str -> 's', 't', 'r', split it in the insertion list, the dictionary inserts the key

del arr[0] keyword delete according to index

pop() removes and returns the last pop(index) pops anywhere

remove() removes only one at a time based on value

sort() A-Z a-z order sort(reverse=True) Reverse list method arr.sort()

sorted() temporary sorting global method sorted(arr,reverse=True)

reverse() reverse order permanently change

len(arr) length return number

## Four, operation list

for \_ in \_s : the colon cannot be missing

The code indented under the for is part of the loop

range(start,stop,step) does not include stop

list(tuple) -> list list(range())

min(list) the smallest number in the list max() sum() summation

List comprehension arr = [value*2 for value in range(1,11)] for statement without :

slice [0:3] index 0 1 2 three el

[:?] 0 ~? [0:] all

[start,stop,step] step default 1 left to right if step = -1 r to l

copy list arr\_ = arr[:] copy text

arr = arr\_ = [] changes the pointer to the same list

An immutable list is called a tuple tuple = ( ) tuple[0] can't modify

tuple[0] = ? error tuple = new tuple success

## Five, if statement

if: elif: else: colon is indispensable

and or logical and logical or

in el in list return true/false

not in

True/False uppercase

arr = [] if arr: False is different from js empty array is also 1

## Six, dictionary

Dictionary is unordered

The key must be quoted, and the access is the same, only the [] access method

del key delete key-value pair

dict.items() return list of contain key,value dict.keys() dict.values()

Traverse dictionary key-value pairs for key,value in dict.items():

Traversing the dictionary directly is the default traversal dict.keys(): = dict:

In-order traversal Sorting the list returned by items().. etc. sorted(list) You cannot use list.sort() class list

set(dict.values()) returns the unique value key itself unique set(sorted()) unique after arrangement

## Seven, user input and while loop

input(prompt) prompt contains a space at the end to separate the prompt and user input

while():

Use the flag sign/? = True/False

break to exit the loop

continue skip the current time

The list or dictionary should not be modified when looping, otherwise there will be unexpected errors. You can modify the copy of the list by modifying
