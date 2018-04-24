<?php 
/*
Copyright (c) 2018 ZSC Dev Team
*/
?>

<html>
<head>
<?php 
include("adm_header.php");
$htmlModules = new ZscHtmlModules();

echo $htmlModules->loadScriptFiles();
?>
<script type="text/javascript">
    var web3 = setupWeb3js(false);
    var ControlApisAdvAdr = "<?php echo $htmlModules->readModuleAddress('ControlApisAdv')?>";
    var userDetails = new ZSCShowUser(ControlApisAdvAdr, cC_getContractAbi('ControlApisAdv'));

    function showUserDetails() {
        if (userDetails.parserUserName()) {
            userDetails.loadUserWallets(function() {
                userDetails.loadWalletHtml("UserDetails");
            });
        }
    }

</script>
</head>
<body>

<?php echo $htmlModules->loadHeader();?>

<div class="page-header"><font size="5" color="blue" >Manage Token Contracts</font></div>

<?php echo $htmlModules->loadAllAdrs();?>

    <div class="well" id="UserDetails"> </div>

<script type="text/javascript">
    window.addEventListener('load', function() {
        showUserDetails();
    });  
</script>   
</body>
</html>