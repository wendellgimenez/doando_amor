// app.js
const pointsOfCollection = [
    { name: "Escola ABC", address: "Rua Fictícia, 123", hours: "08:00 - 17:00", contact: "escola@ficticia.com", phone: "(11) 1234-5678" },
    { name: "Bar do João", address: "Avenida Imaginária, 456", hours: "10:00 - 22:00", contact: "bar@joao.com", phone: "(11) 8765-4321" },
    { name: "Clube XYZ", address: "Rua Inventada, 789", hours: "09:00 - 18:00", contact: "clube@xyz.com", phone: "(11) 3456-7890" },
    { name: "Centro Comunitário", address: "Praça Fictícia, 321", hours: "08:00 - 15:00", contact: "centro@comunitario.com", phone: "(11) 9876-5432" },
    { name: "Biblioteca Municipal", address: "Rua Exemplo, 654", hours: "10:00 - 17:00", contact: "biblioteca@municipal.com", phone: "(11) 5432-1098" }
];

const donationTypeSelect = document.getElementById('donation-type');
const donationDetailsDiv = document.getElementById('donation-details');
const donationList = document.getElementById('donation-list');

donationTypeSelect.addEventListener('change', function() {
    const type = this.value;
    donationDetailsDiv.innerHTML = '';

    if (type) {
        donationDetailsDiv.innerHTML = getDonationForm(type);
    }
});

document.getElementById('donation-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const donation = {
        type: formData.get('type'),
        point: formData.get('collection-point'),
        deliveryDate: formData.get('delivery-date'),
        details: getDonationDetails(formData)
    };

    saveDonation(donation);
    displayDonations();

    // Limpar o formulário após o salvamento
    this.reset();  // Limpa o formulário
});


// Define os pontos de coleta
const collectionPoints = [
    {
        name: "Escola ABC",
        address: "Rua das Flores, 123",
        hours: "Segunda a Sexta, das 8h às 17h",
        contact: "contato@escolaabc.com.br - (11) 1234-5678"
    },
    {
        name: "Bar do João",
        address: "Avenida Central, 456",
        hours: "Segunda a Domingo, das 10h às 22h",
        contact: "contato@bardojose.com.br - (11) 2345-6789"
    },
    {
        name: "Clube Recreativo",
        address: "Rua das Palmeiras, 789",
        hours: "Segunda a Sexta, das 9h às 18h",
        contact: "contato@cluberec.com.br - (11) 3456-7890"
    },
    {
        name: "Biblioteca Municipal",
        address: "Praça dos Livros, 101",
        hours: "Segunda a Sexta, das 8h às 19h",
        contact: "contato@bibliotecamunicipal.com.br - (11) 4567-8901"
    },
    {
        name: "Centro Comunitário",
        address: "Rua dos Amigos, 202",
        hours: "Segunda a Sábado, das 8h às 18h",
        contact: "contato@centrocomunitario.com.br - (11) 5678-9012"
    }
];

// Exibe os pontos de coleta na página
function displayCollectionPoints() {
    const collectionPointsList = document.getElementById('collection-points-list');
    collectionPointsList.innerHTML = collectionPoints.map(point => `
        <div class="collection-point">
            <h3>${point.name}</h3>
            <p><strong>Endereço:</strong> ${point.address}</p>
            <p><strong>Horário de Funcionamento:</strong> ${point.hours}</p>
            <p><strong>Contato:</strong> ${point.contact}</p>
        </div>
    `).join('');
}

// Chama a função para exibir os pontos de coleta quando a página carrega
displayCollectionPoints();

function getDonationForm(type) {
    let form = '';

    switch(type) {
        case 'alimento':
            form = `
                <label for="food-type">Tipo de Alimento:</label>
                <input type="text" id="food-type" name="food-type">
                <label for="unit">Unidade de Medida:</label>
                <select id="unit" name="unit">
                    <option value="kg">Kg</option>
                    <option value="pacote">Pacote</option>
                    <option value="litros">Litros</option>
                    <option value="unidade">Unidade</option>
                </select>
                <label for="quantity">Quantidade:</label>
                <input type="number" id="quantity" name="quantity">
                <label for="expiry-date">Data de Validade:</label>
                <input type="date" id="expiry-date" name="expiry-date">
                ${getPointsOfCollectionHtml()}
                <label for="delivery-date">Data de Entrega:</label>
                <input type="date" id="delivery-date" name="delivery-date">
            `;
            break;
        case 'roupa':
            form = `
                <label for="clothing-item">Qual Peça:</label>
                <input type="text" id="clothing-item" name="clothing-item">
                <label for="size">Tamanho:</label>
                <input type="text" id="size" name="size">
                <label for="quantity">Quantidade:</label>
                <input type="number" id="quantity" name="quantity">
                <label for="gender">Sexo:</label>
                <select id="gender" name="gender">
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                </select>
                ${getPointsOfCollectionHtml()}
                <label for="delivery-date">Data de Entrega:</label>
                <input type="date" id="delivery-date" name="delivery-date">
            `;
            break;
        case 'brinquedo':
            form = `
                <label for="toy">Qual Brinquedo:</label>
                <input type="text" id="toy" name="toy">
                <label for="quantity">Quantidade:</label>
                <input type="number" id="quantity" name="quantity">
                ${getPointsOfCollectionHtml()}
                <label for="delivery-date">Data de Entrega:</label>
                <input type="date" id="delivery-date" name="delivery-date">
            `;
            break;
        case 'material-limpeza':
            form = `
                <label for="cleaning-material">Qual Material:</label>
                <input type="text" id="cleaning-material" name="cleaning-material">
                <label for="quantity">Quantidade:</label>
                <input type="number" id="quantity" name="quantity">
                ${getPointsOfCollectionHtml()}
                <label for="delivery-date">Data de Entrega:</label>
                <input type="date" id="delivery-date" name="delivery-date">
            `;
            break;
        case 'material-higiene':
            form = `
                <label for="hygiene-material">Qual Material:</label>
                <input type="text" id="hygiene-material" name="hygiene-material">
                <label for="quantity">Quantidade:</label>
                <input type="number" id="quantity" name="quantity">
                ${getPointsOfCollectionHtml()}
                <label for="delivery-date">Data de Entrega:</label>
                <input type="date" id="delivery-date" name="delivery-date">
            `;
            break;
        default:
            form = '';
    }

    return form;
}

function getPointsOfCollectionHtml() {
    return `
        <label for="collection-point">Ponto de Coleta:</label>
        <select id="collection-point" name="collection-point">
            ${pointsOfCollection.map(point => `<option value="${point.name}">${point.name}</option>`).join('')}
        </select>
    `;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
}

function getDonationDetails(formData) {
    return `
        Tipo de Doação: ${formData.get('type')}<br>
        Ponto de Coleta: ${formData.get('collection-point')}<br>
        Data de Entrega: ${formatDate(formData.get('delivery-date'))}<br>
        ${getAdditionalDetails(formData)}
    `;
}

function getAdditionalDetails(formData) {
    switch(formData.get('type')) {
        case 'alimento':
            return `
                Tipo de Alimento: ${formData.get('food-type')}<br>
                Unidade: ${formData.get('unit')}<br>
                Quantidade: ${formData.get('quantity')}<br>
                Data de Validade: ${formatDate(formData.get('expiry-date'))}
            `;
        case 'roupa':
            return `
                Peça: ${formData.get('clothing-item')}<br>
                Tamanho: ${formData.get('size')}<br>
                Quantidade: ${formData.get('quantity')}<br>
                Sexo: ${formData.get('gender')}
            `;
        case 'brinquedo':
            return `
                Brinquedo: ${formData.get('toy')}<br>
                Quantidade: ${formData.get('quantity')}
            `;
        case 'material-limpeza':
            return `
                Material: ${formData.get('cleaning-material')}<br>
                Quantidade: ${formData.get('quantity')}
            `;
        case 'material-higiene':
            return `
                Material: ${formData.get('hygiene-material')}<br>
                Quantidade: ${formData.get('quantity')}
            `;
        default:
            return '';
    }
}

let donations = [];

function saveDonation(donation) {
    donations.push(donation);
    localStorage.setItem('donations', JSON.stringify(donations));
}

function displayDonations() {
    donationList.innerHTML = donations.map(donation => `
        <li>
            ${donation.details}<br>
        </li>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const savedDonations = localStorage.getItem('donations');
    if (savedDonations) {
        donations = JSON.parse(savedDonations);
        displayDonations();
    }
});