import re
import cgi

print('dentro')

form = cgi.FieldStorage()
expression =  form.getvalue('expression')

x = re.search("^The.*Spain$", expression)

if x:
  print("YES! We have a match!")
else:
  print("No match")