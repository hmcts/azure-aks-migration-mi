#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline')

const productMapping = {
    'cmc-pdf-service': 'rpe',
    'rpe-send-letter-service': 'bulk-print',
    'div': 'divorce',
    'cmc': 'cmc',
    'bulk-scan': 'bulk-scan',
    'ccd': 'ccd',
    'plum': 'rpe',
    'custard': 'rpe',
    'cet': 'cmc',
    'dm':'evidence',
    'em': 'evidence',
    'dg': 'evidence',
    'finrem': 'finrem',
    'ia': 'ia',
    'idam': 'idam',
    'fees': 'fees-pay',
    'payment-api': 'fees-pay',
    'ccpay': 'fees-pay',
    'bar': 'fees-pay',
    'probate': 'probate',
    'rpe': 'rpe',
    'draft-store': 'rpe',
    'pbi': 'rpe',
    'jui': 'professional-apps',
    'pui': 'professional-apps',
    'xui': 'professional-apps',
    'coh': 'professional-apps',
    'rpa': 'professional-apps',
    'rpx': 'professional-apps',
    'ref': 'professional-apps',
    'rhubarb': 'rpe',
    'sscs': 'sscs',
    'sscs-tya': 'sscs',
    'sscs-tribunals': 'sscs',
    'snl': 'snl',
    'am': 'am',
    'fpl': 'family-public-law',
    'ctsc': 'ctsc',
    'rd': 'reference-data',
    'camunda': 'rpe',
    'ethos': 'ethos'
}

const frontendApps = [
    'bar-web',
    'ccd-admin-web',
    'ccd-api-gateway-web',
    'ccd-case-management-web',
    'ccd-case-print-service',
    'ccd-case-activity-api',
    'ccpay-bubble-frontend',
    'cmc-citizen-frontend',
    'cmc-legal-frontend',
    'div-da',
    'div-dn',
    'div-pfe',
    'div-rfe',
    'fees-register-frontend',
    'idam-web-admin-idam',
    'idam-web-public-idam',
    'jui-webapp',
    'jui-webapp-web',
    'plum-frontend',
    'probate-caveats-fe',
    'probate-frontend',
    'probate-frontend-shutter',
    'probate-hm',
    'pui-registration',
    'rhubarb-frontend',
    'sscs-cor-frontend',
    'sscs-cor-frontend-shutter',
    'sscs-tribunals-frontend',
    'sscs-tribunals-frontend-shutter',
    'sscs-tya-frontend',
    'sscs-tya-frontend-shutter',
    'xui-ao-webapp',
    'xui-mo-webapp',
    'xui-webapp'
]

const appRenames = {
    'pdf-service': 'cmc-pdf-service',
    'repl-docmosis-service': 'ethos-repl-docmosis-service'
}

const aseReadInterface = readline.createInterface({
    input: fs.createReadStream('ase-apps.txt'),
    console: false
})

aseReadInterface.on('line', function(line) {
    const key = Object.keys(productMapping)
        .filter(key => line.startsWith(key))[0]

    const tier = frontendApps.includes(line) ? "frontend" : "backend"

    console.log(`"${productMapping[key]}","${line}","ASE","${tier}"`)
})

const aksReadInterface = readline.createInterface({
    input: fs.createReadStream('aks-apps.txt'),
    console: false
})

aksReadInterface.on('line', function(line) {
    // some release names in flux don't have the product name pre-pended
    const mappedLine = appRenames[line] || line

    const key = Object.keys(productMapping)
        .filter(key => mappedLine.startsWith(key))[0]

    const tier = frontendApps.includes(mappedLine) ? "frontend" : "backend"

    console.log(`"${productMapping[key]}","${mappedLine}","AKS","${tier}"`)
})

