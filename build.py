import glob,sys,re
s=open('lisboa/template.html',encoding='utf8').read()
files=sorted(glob.glob('story/*.js')) if len(sys.argv)<2 else sys.argv[1:]
data='\n'.join(open(f,encoding='utf8').read() for f in files)
out=s.replace('/*STORY-DATA*/',data)
open('lisboa/index.html','w',encoding='utf8').write(out)
open('check.js','w',encoding='utf8').write(re.search(r'<script>(.*)</script>',out,re.S).group(1))
print('built with',files)
