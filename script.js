document.getElementById('search-button').addEventListener('click', function() {
    const cep = document.getElementById('cep-input').value.trim();
    if (cep.length !== 8 || isNaN(cep)) {
        document.getElementById('result').innerHTML = '<p style="color: red;">Formato de CEP inválido.</p>';
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('result').innerHTML = '<p style="color: red;">CEP não encontrado.</p>';
            } else {
                const address = `<p><strong>Logradouro:</strong> ${data.logradouro}</p>
                                <p><strong>Bairro:</strong> ${data.bairro}</p>
                                <p><strong>Cidade:</strong> ${data.localidade} - ${data.uf}</p>`;
                document.getElementById('result').innerHTML = address;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            document.getElementById('result').innerHTML = '<p style="color: red;">Erro ao buscar CEP. Por favor, tente novamente mais tarde.</p>';
        });
});
