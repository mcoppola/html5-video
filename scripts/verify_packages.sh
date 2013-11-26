#!/bin/sh
#
# Verify Packages
#
# takes any number of packages to check
# returns JSON of { package : 1 if installed, else 0 }

for P; do
    dpkg -s "$P" >/dev/null 2>&1 && {
        echo { \"$P\":1}
    } || {
        echo { \"$P\":0}
    }
done

