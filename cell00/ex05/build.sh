#!/bin/bash

# 1. ตรวจสอบว่าถ้าไม่มีการใส่ argument เลย
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    # 2. วนลูปหยิบ argument ทุกตัวที่ใส่มา
    for arg in "$@"; do
        # 3. สร้าง folder โดยเอาคำว่า "ex" มาแปะข้างหน้าชื่อ argument
        mkdir "ex$arg"
    done
fi
