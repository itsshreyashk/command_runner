#!/bin/bash

read command

result=$(eval "$command")


echo "$result"