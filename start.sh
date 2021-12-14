#!/bin/bash

gzip -kdc /database.sql.gz | mysql -Dwp4 -hlocalhost -uroot -ppassword -v
