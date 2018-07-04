#!/bin/bash
INTERVAL="5s"
MYIPADDR=""
COUNTER=0
	while [  $COUNTER -gt -1 ]; do
		TIMESTAMP=$(date +"%c")
		IPADDRESS=`curl -s icanhazip.com`
		echo -e "${COUNTER}|${TIMESTAMP}|${IPADDRESS}"
		if [ "$MYIPADDR" != "$IPADDRESS" ]; then
			echo "External IP address changed from ${MYIPADDR} to ${IPADDRESS}"
			echo "External IP address changed from ${MYIPADDR} to ${IPADDRESS}" | mail -s "IP Changed @ ${TIMESTAMP}" "nlaakald@gmail.com"
			MYIPADDR="$IPADDRESS"
		fi
		sleep $INTERVAL
        let COUNTER=COUNTER+1 
    done