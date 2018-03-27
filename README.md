# ZSC
Zeusshield (ZSC) system: AI&P2P Insurance Market Platform [(ZSC Wiki)](https://github.com/zeus-shield/zsc/wiki)

Official solidity implementation for the core part of the ZSC system.

Implementation of the website based interfance not included here.


## 1. Coding structure

### 1.1 Contracts: the solidity-based coding here

#### token: zsc token contract, Based on ERC20 protocol

#### database: construct the decentralized databased

#### plat: basic functions

### 1.2 Test: testing codes here

## 2. ZSC platform part:

### 2.1 Framework Components
```bash
|-- owned
    |-- delegated
        |-- log_recorder
        |-- objct 
            |-- db_idmanager
            |-- db_node 
                |-- db_entity 
                    |-- db_user
                        |-- db_receiver
                        |-- db_provider
                |-- db_item
                |-- db_template
                |-- db_agreement
            |-- db_database
            |-- factory_base
            |-- control_base
              |-control_info
                |-- control_apis
```

### 2.2 .sol update log
```bash
2017.09.05: add multisigtoken.sol, multisigwallet.sol and token.sol
2017.10.28: add the initial version of zscDatabase.sol
2017.12.18: add five files: plat_math.sol v0.01; plat_string.sol v0.01; plat_vector3d.sol v0.01; db_entity.sol v0.01; db_agreement.sol v0.01
2018.02.09: add three new files: db_receiver.sol v0.03; db_database.sol v0.02; test_basic_funcs.js 0.01
2018.02.10: add one new file: db_provider.sol 0.02
2018.02.10: add one new file: db_item.sol 0.01
2018.02.11: add three new file: object.sol 0.01; db_template.sol 0.01; db_idmanager.sol 0.01
2018.02.12: add a new file: db_node.sol 0.01
2018.02.13-14: re-design the topology among different db modules
2018.02.15: add a new file: app_basic.sol 0.01
2018.02.16: change the name app_basic.sol to db_apis.sol; add a new file: app_controller.sol 0.01
2018.02.17-18: add the mapping among parameter (bytes32) and its value (string) in app_controller.sol. Enable the operation of parsering and returning the string from/to the client 
2018.02.19: add two new files: test_database.sol; test_create_contract.sol
2018.02.20-21: test and modification on different db modules.
2018.02.24: add a new file db_user.sol
2018.02.22-25: start constructing the new way of "passing string" among contracts.
2018.02.26: add a new file plat_externalcontracts.sol
2018.02.27-03.01: re-construct the system as the currrent size of entire compiled bin (single) file is over 70KB, which leades to oversized error when deploying to the ethereum platform
2018.03.02-03.04: testing on db_database and db_node.f
2018.03.05: add a new file factory_basic.sol
2018.03.06: working on testing the db_database and db_node;
2018.03.07: creating db_node by integrating with db_database is ok by now
2018.03.08: chnage factory_basic.sol to db_factory.sol
2018.03.09-10: creating a DBProvider node and setting node parameters by DBApis are ok
2018.03.11: change file names: db_factory.sol->factory_base.sol, db_apis.sol->control_apis.sol
2018.03.12: add two files: control_info.sol and control_apis.sol
2018.03.13-15: work on testing zsc APIs with using Ethereum JS-APIs; to be continued...
2018.03.16: add a file: log_recorder.sol
2018.03.17-19: work on developing ZSC ControlApis based javascript apis used for web-client; work on dev. db_template;
2018.03.20-22: be compatible with Metamask now
2018.03.23-26: work on integrating web3.js apis, Metamask and zsc apis via web
2018.03.27: start developing the functionality of creating customized insurance template
```
