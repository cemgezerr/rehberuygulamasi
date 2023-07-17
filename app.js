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
let secilenSatir = undefined;

function kisiIslemleriniYap(event) {

    if (event.target.classList.contains('btn--delete')) {
        const silinicekTr = kisiSil(event.target.parentElement.parentElement);
        const silinecekMail = event.target.parentElement.previousElementSibling.textContent;
        kisiSil(silinicekTr,silinecekMail)
    } else if(event.target.classList.contains('btn--edit')){
       document.querySelector('.kaydetGuncelle').value = 'Guncelle'
       const secilenTr = event.target.parentElement.parentElement;
       const guncellenecekMail = secilenTr.cells[2].textContent;

       ad.value =secilenTr.cells[0].textContent;
       soyad.value =secilenTr.cells[1].textContent;
       mail.value =secilenTr.cells[2].textContent;

       secilenSatir = secilenTr;
       console.log(tumKisilerDizisi);
    }

}
function kisiSil(silinicekTrElementi,silinecekMail){
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

    alanlariTemizle();
    document.querySelector('.kaydetGuncelle').value ='Kaydet'

}


function kaydet(e) {
    e.preventDefault();

    const eklenecekveyaGuncellenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value

    }
    const sonuc = verileriKontrolEt(eklenecekveyaGuncellenecekKisi)
    if (sonuc.durum) {
        if(secilenSatir){
      
            kisiyiGuncelle(eklenecekveyaGuncellenecekKisi)
        }else{
            kisiyiEkle(eklenecekveyaGuncellenecekKisi);
        }
      
    } else {
        bilgiOlustur(sonuc.mesaj, sonuc.durum)

    }
}
function kisiyiGuncelle(kisi){

    for(let i = 0 ; i< tumKisilerDizisi.length; i++){
        if(tumKisilerDizisi[i].mail === secilenSatir.cells[2].textContent){
            tumKisilerDizisi[i]= kisi;
            break;
        }
    }

    secilenSatir.cells[0].textContent = kisi.ad;
    secilenSatir.cells[1].textContent = kisi.soyad;
    secilenSatir.cells[2].textContent= kisi.mail;

    document.querySelector('.kaydetGuncelle').value = ' KAYDET'
    secilenSatir= undefined;
    console.log(tumKisilerDizisi);
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