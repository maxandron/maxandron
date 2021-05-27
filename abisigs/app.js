function extractHashes() {
    let abi = JSON.parse(document.querySelector("#abicode").value)
    let results = document.getElementById("signaturesTbl");
    results.innerHTML = "";
    //TODO: catch parse error
    abi.filter(func => func.type == "function")
        .map(func => `${func.name}(${func.inputs.map(i => i.type).join(",")})`)
        .map(signature => [signature, Web3.utils.sha3(signature).slice(0, 10)])
        .forEach(function(signature) {
            results.innerHTML += `<tr><td>${signature[0]}</td>
                <td>${signature[1]}</td></tr>`
        });
}

window.onload = function(_) {
    document.querySelector("#extractBtn").onclick = extractHashes;
};
