#!/bin/bash 

HOST=www.i2tmlabs.com  		#This is the FTP servers host or IP address. 
USER=nlaakald             	#This is the FTP user that has access to the server. 
PASS=yy166027!ALD      		#This is the password for the FTP user. 

# or 
#get test.txt 
# Call 1. Uses the ftp command with the -inv switches.  -i turns off interactive prompting. 
#-n Restrains FTP from attempting the auto-login feature. -v enables verbose and progress.  
ftp -inv $HOST << EOF 
user $USER $PASS 
cd www/h5c3/public/shared/js/int 
put build.js 
bye 
EOF 