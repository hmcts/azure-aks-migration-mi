#!/usr/bin/env bash
set -e

##### ASE #####
az webapp list --subscription DCD-CNP-PROD --query '[].name' -o tsv | sort | sed  's/-prod//' > ase-apps.txt

##### AKS #####
rm -rf cnp-flux-config/
git clone --depth 1 https://github.com/hmcts/cnp-flux-config.git

rg --no-line-number --no-heading  --no-filename "releaseName: (.*)" -r '$1' cnp-flux-config/k8s/prod/common cnp-flux-config/k8s/prod/cluster-00 cnp-flux-config/k8s/prod/cluster-01 | awk '{$1=$1};1' | uniq > aks-apps.txt
rm -rf cnp-flux-config/

##### Create merged file ####
rm -f ase-merged.csv
echo '"Product","App","Where","Tier"' > ase-merged.csv
./index.js >> ase-merged.csv

az storage blob upload --account-name mgmtstatestoreprod --container-name aks-migration-mi --name ase-merged.csv  --file ase-merged.csv --subscription DCD-CNP-Prod
