function MenuChoice()
{
    if(document.getElementById("Menu").value == "Add Customer Information")
    {
        document.getElementById("addcust").style.visibility = "visible";
        document.getElementById("chgshipinfo").style.visibility = "hidden";
        document.getElementById("delcust").style.visibility = "hidden";
        document.getElementById("addcust").style.display = "block";
        document.getElementById("chgshipinfo").style.display = "none";
        document.getElementById("delcust").style.display = "none";
    }
    else if(document.getElementById("Menu").value == "Change Shipping Information")
    {
        document.getElementById("addcust").style.visibility = "hidden";
        document.getElementById("chgshipinfo").style.visibility = "visible";
        document.getElementById("delcust").style.visibility = "hidden";
        document.getElementById("addcust").style.display = "none";
        document.getElementById("chgshipinfo").style.display = "block";
        document.getElementById("delcust").style.display = "none";
    }
    else if(document.getElementById("Menu").value == "Delete Customer Information")
    {
        document.getElementById("addcust").style.visibility = "hidden";
        document.getElementById("chgshipinfo").style.visibility = "hidden";
        document.getElementById("delcust").style.visibility = "visible";
        document.getElementById("addcust").style.display = "none";
        document.getElementById("chgshipinfo").style.display = "none";
        document.getElementById("delcust").style.display = "block";
    }
   else
    {
        document.getElementById("addcust").style.visibility = "hidden";
        document.getElementById("chgshipinfo").style.visibility = "hidden";
        document.getElementById("delcust").style.visibility = "hidden";
        document.getElementById("addcust").style.display = "none";
        document.getElementById("chgshipinfo").style.display = "none";
        document.getElementById("delcust").style.display = "none";
    }
}

function AddCustInfo()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("custinfo").innerHTML = "The operation was successful";
    }
    else
    {
        document.getElementById("custinfo").innerHTML = "The operation was not successful" + "<br>" + output.Exception;
    }
}

function ChgShip ()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    var ordernum = document.getElementById("ordnum").value;
    var shiptoname = document.getElementById("shiptoname").value;
    var shiptostradd = document.getElementById("shiptoaddress").value;
    var shiptocity = document.getElementById("shiptocity").value;
    var shiptopcode = document.getElementById("shiptocode").value;
    
    var shipinfo = '{"OrderID":' + ordernum + ',"ShipAddress":"' + shiptostradd + '","ShipCity":"' + shiptocity + '","ShipName":"' + shiptoname + '","ShipPostcode":"' + shiptopcode + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult1(result);
        }
    }
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(shipinfo);
}

function OperationResult1(output)
{
    if (output == 1)
    {
        document.getElementById("shipinfo").innerHTML = "The operation was successful";
    }
    else
    {
        document.getElementById("shipinfo").innerHTML = "The operation was not successful" + "<br>" + output.Exception;
    }
}

function DelCust()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    url += document.getElementById("dcustid").value;
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult2(result);
        }
    }
    
    objRequest.open("GET", url, true);
    objRequest.send();
}

function OperationResult2(output)
{
    if (output.DeleteCustomerResult.WasSuccessful == 1)
    {
        document.getElementById("delete").innerHTML = "The operation was successful";
    }
    else
    {
        document.getElementById("delete").innerHTML = "The operation was not successful" + "<br>" + output.Exception;
    }
}