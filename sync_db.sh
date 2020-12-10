#!/bin/bash

heroku pg:backups:capture DATABASE_URL
heroku pg:backups:download
psql -p 5432 "tweet_stream_er" -c "drop schema public cascade; create schema public;"
pg_restore --verbose --clean --no-acl --no-owner -h localhost -U kiana -d tweet_stream_er latest.dump
rm latest.dump
