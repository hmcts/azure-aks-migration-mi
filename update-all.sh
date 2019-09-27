#!/usr/bin/env bash
set -e

##### ASE #####
az webapp list --subscription DCD-CNP-PROD --query '[].name' -o tsv | sort | sed  's/-prod//' > ase-apps.txt

##### AKS #####
rm -rf cnp-flux-config/
git clone --depth 1 git@github.com:hmcts/cnp-flux-config

rg --no-line-number --no-heading  --no-filename "releaseName: (.*)" -r '$1' cnp-flux-config/k8s/prod/common | awk '{$1=$1};1' > aks-apps.txt
rm -rf cnp-flux-config/

##### Create merged file ####
rm -f ase-merged.csv
echo '"Product","App","Where","Tier"' > ase-merged.csv
./index.js >> ase-merged.csv

az storage blob upload --account-name mgmtstatestoresandbox --container-name aks-migration-mi --name ase-merged.csv  --file ase-merged.csv --subscription DCD-CFT-Sandbox