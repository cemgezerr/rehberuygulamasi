// elementler

const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('email');

const form = document.getElementById('form-rehber');
const kisiListesi = document.querySelector('.kisi-listesi')

//event listener
form.addEventListener('submit', kaydet)
kisiListesi.addEventListener('click', kisiIslemleriniYap)

const tumKisilerDizisi = [];

function kisiIslemleriniYap(event) {

    if (event.target.classList.contains('btn--delete')) {
        const silinicekTr = rehberdenSil(event.target.parentElement.parentElement);
        const silinecekMail = event.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinicekTr,silinecekMail)
    } else if(e.target.classList.contains('btn--edit')){
        console.log('güncelleme');
    }
}
function rehberdenSil(silinicekTrElementi,silinecekMail){
    silinicekTrElementi.remove();

    // maile göre silme işlemi
    // tumKisilerDizisi.forEach((kisi,index)=>{
    //     if(kisi.mail === silinecekMail){
    //     tumKisilerDizisi.splice(index,1)}
    // })

    const silinmeyecekKisiler = tumKisilerDizisi.filter(function(kisi,index){
        return kisi.mail !== silinecekMail;
    })
    tumKisilerDizisi.length = 0;
    tumKisilerDizisi.push(...silinmeyecekKisiler); 

}


function kaydet(e) {
    e.preventDefault();

    const eklenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value

    }
    const sonuc = verileriKontrolEt(eklenecekKisi)
    if (sonuc.durum) {
        kisiyiEkle(eklenecekKisi);
    } else {
        bilgiOlustur(sonuc.mesaj, sonuc.durum)

    }
}
function kisiyiEkle(eklenecekKisi) {
    const olusturulanTrElementi = document.createElement('tr');
    olusturulanTrElementi.innerHTML =
        `<td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class="btn btn--edit"> <i class="fa fa-edit" aria-hidden="true"></i></button>
        <button class="btn btn--delete"> <i class="fa fa-trash" aria-hidden="true"></i></button>
    </td>`;

    kisiListesi.appendChild(olusturulanTrElementi);
    tumKisilerDizisi.push(eklenecekKisi);

    bilgiOlustur('Kişi rehbere kaydedildi', true)
}

function verileriKontrolEt(kisi) {
    //objelerde in dizilerde of
    for (const deger in kisi) {
        if (kisi[deger]) {
            console.log(kisi[deger]);
        } else {

            const sonuc = {
                durum: false,
                mesaj: 'Boş alan bırakmayınız'
            }
            return sonuc

        }
    }
    alanlariTemizle()
    return {
        durum: true,
        mesaj: 'Kaydedildi'
    }
}

function bilgiOlustur(mesaj, durum) {
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.className = 'bilgi';
    // if(durum){
    //     olusturulanBilgi.classList.add('bilgi--success')
    // }else{
    //     olusturulanBilgi.classList.add('bilgi--error')
    // }
    olusturulanBilgi.classList.add(durum ? 'bilgi--success' : 'bilgi--error');
    document.querySelector('.container').insertBefore(olusturulanBilgi, form);

    setTimeout(function () {
        const silinicekDiv = document.querySelector('.bilgi');
        if (silinicekDiv) {
            silinicekDiv.remove()
        }
    }, 2000)
}
function alanlariTemizle() {
    ad.value = '';
    soyad.value = '';
    mail.value = '';
}