import React, { useState, useEffect } from 'react';
import { TrendingUp, ChevronRight, Briefcase, BadgeDollarSign, FileText, DollarSign, CheckCircle, Send, CreditCard, MessageCircle, Search, Package } from 'lucide-react';
import akImage from '../assets/ak.png';

const translations = {
  en: {
    title: "LILO Store",
    tagline: "- SELL FAST - BUY CHEAP - LOAN QUICK -",

    menu: {
      sell: "HOW TO SELL SKINS FAST",
      buy: "HOW TO BUY/TRADE",
      loans: "SKIN PAWN (QUICK LOAN)",
      pricing: "PRICING POLICY",
      terms: "READ BEFORE TRANSACTION"
    },

    sell: {
      title: "Sell Your Skins in a Flash",
      subtitle: "Turn skins into cash instantly",
      steps: [
        {
          title: "Show Skins",
          desc: "Provide details of skins/items you want to sell via Discord, Twitter or Steam"
        },
        {
          title: "Set Price",
          desc: "Get price quickly, negotiation is welcome without delay"
        },
        {
          title: "Confirm Deal",
          desc: "Review details and confirm you're happy with the offer"
        },
        {
          title: "Steam Trade",
          desc: "Complete Steam trade by sending the agreed skins"
        },
        {
          title: "Get Paid",
          desc: "Receive payment immediately to your preferred method"
        }
      ]
    },

    buy: {
      title: "Buy & Trade Skins",
      subtitle: "Get the skins you want, hassle-free",
      steps: [
        {
          title: "Contact Us",
          desc: "Reach out via Discord, Twitter, or Steam"
        },
        {
          title: "Choose Skin",
          desc: "Tell us which skins you're looking for. Available skins are sent instantly, unavailable ones take around 8 days"
        },
        {
          title: "Get Quote",
          desc: "Receive price offer and negotiate terms"
        },
        {
          title: "Make Payment",
          desc: "Pay according to the agreed method and amount"
        },
        {
          title: "Receive Skin",
          desc: "Skin will be sent via Steam Trade according to terms"
        }
      ]
    },

    loans: {
      title: "Skin Pawn",
      subtitle: "Get cash loans using your skins as collateral",
      intro: "Skin pawn allows you to BORROW MONEY using skins as collateral. Loans can be made for a maximum period of 3 months (for now), with 5% interest for the first month and 3% for subsequent months. Skins used as collateral should be worth 110% of the loan amount.",
      exampleTitle: "Example:",
      example: [
        "Want to borrow 200k",
        "Provide skins worth 220k",
        "",
        "After 1 month: return 210k to get your skins back",
        "For 2 month tenor: 215k",
        "For 3 month tenor: 220k, and so on"
      ],
      option: "Borrowers have the option not to pay, with the consequence that the skins become our property."
    },

    pricing: {
      title: "Fair Price",
      subtitle: "Transparent pricing based on mutual agreement",
      intro: "All buy and sell prices are based on mutual agreement between seller and buyer.",
      transparency: "For transparency in determining prices, we benchmark against CS Float buy order prices plus fees. Of course, prices also depend on the supply and demand of an item.",
      noAccess: "For those who don't have access to CSFloat, here's the general pricing:",
      sellTitle: "SELL/CASHOUT",
      sellPrice: "Steam Price × 60% (60% of current Steam price)",
      buyTitle: "BUY/TRADE",
      buyPrice: "Steam Price × 80% (80% of current Steam price)",
      disclaimer: "*These prices are rough estimates, mostly depending on mutual agreement"
    },

    terms: {
      title: "READ BEFORE TRANSACTION",
      subtitle: "Important terms you must understand",

      intro: "Customers are expected to understand the process and agree to the decisions made when conducting transactions.",

      warningTitle: "IMPORTANT:",
      warning: "IT IS PROHIBITED TO PERFORM TRADE REVERSAL without confirmation. If done, consequences include damage to your Steam account reputation and future transactions.",

      generalTitle: "General Terms:",
      general: [
        "All trades are final once completed via Steam",
        "We reserve the right to refuse service to anyone"
      ],

      yourTitle: "Your Responsibilities:",
      your: [
        "Ensure your Steam account is secure and trade-ready",
        "Provide accurate information about your skins",
        "Complete trades within the agreed timeframe",
        "DO NOT attempt trade reversals"
      ],

      ourTitle: "Our Commitment:",
      our: [
        "All payments processed securely and promptly",
        "Professional service and clear communication",
        "Privacy respected - we never share your data",
        "Fair pricing based on real market conditions"
      ]
    },

    contact: {
      title: "Contact Us",
      discord: "Discord",
      twitter: "Twitter / X",
      steam: "Steam"
    },

    footer: {
      copyright: "© 2025 LILO Store. All rights reserved. Trading done right."
    }
  },

  id: {
    title: "LILO Store",
    tagline: "- JUAL CEPAT - BELI MURAH - PINJAM CEPAT -",

    menu: {
      sell: "CARA JUAL SKIN CEPAT",
      buy: "CARA BELI/TRADE",
      loans: "GADAI SKIN (PINJAM CEPAT)",
      pricing: "PENETAPAN HARGA",
      terms: "BACA SEBELUM TRANSAKSI"
    },

    sell: {
      title: "Jual Skin Anda dalam Sekejap",
      subtitle: "Ubah skins jadi rupiah dengan instant",
      steps: [
        {
          title: "Tunjukkan Skins",
          desc: "Berikan detail skins/item yang ingin dijual kepada kami melalui Discord, Twitter atau Steam"
        },
        {
          title: "Tentukan Harga",
          desc: "Dapatkan harga dengan cepat, tawar-menawar dipersilakan tanpa berlama-lama"
        },
        {
          title: "Konfirmasi Deal",
          desc: "Review detail dan konfirmasi jika setuju dengan penawaran"
        },
        {
          title: "Steam Trade",
          desc: "Selesaikan Steam trade dengan mengirimkan skin yang sudah disepakati"
        },
        {
          title: "Terima Pembayaran",
          desc: "Uang langsung masuk ke metode pembayaran pilihanmu"
        }
      ]
    },

    buy: {
      title: "Beli & Trade Skin",
      subtitle: "Dapatkan skin yang kamu mau, tanpa ribet",
      steps: [
        {
          title: "Hubungi Kami",
          desc: "Chat lewat Discord, Twitter, atau Steam"
        },
        {
          title: "Pilih Skin",
          desc: "Kasih tau skin apa yang kamu cari. Skin yang tersedia dikirim instan, yang tidak tersedia menunggu sekitar 8 hari"
        },
        {
          title: "Dapat Harga",
          desc: "Terima penawaran harga dan tentukan negosiasi"
        },
        {
          title: "Bayar",
          desc: "Bayar sesuai dengan metode dan nominal yang telah ditentukan bersama"
        },
        {
          title: "Terima Skin",
          desc: "Skin akan dikirim melalui Steam Trade sesuai ketentuan"
        }
      ]
    },

    loans: {
      title: "Gadai Skins",
      subtitle: "Pinjam uang dengan jaminan skins",
      intro: "Gadai Skins memungkinkan untuk PEMINJAMAN UANG, dengan jaminan skins. Peminjaman dapat dilakukan untuk jangka waktu maksimal 3 bulan (untuk saat ini), dengan bunga 5% untuk bulan pertama dan 3% untuk bulan selanjutnya. Skins sebagai bahan gadai seharga 110% dari jumlah pinjaman.",
      exampleTitle: "Sebagai contoh:",
      example: [
        "Ingin pinjam 200k",
        "Berikan skins seharga 220k",
        "",
        "Ketika sudah sebulan, kembalikan 210k untuk mengambil skins anda kembali",
        "Untuk tenor 2 bulan adalah 215k",
        "Untuk tenor 3 bulan adalah 220k, begitu seterusnya"
      ],
      option: "Peminjam punya opsi untuk tidak membayar, dengan konsekuensi skins menjadi hak milik kami."
    },

    pricing: {
      title: "Fair Price",
      subtitle: "Harga transparan berdasarkan kesepakatan bersama",
      intro: "Semua harga jual dan beli merupakan kesepakatan bersama antara penjual dan pembeli.",
      transparency: "Untuk transparansi dalam menentukan harga, kami membuat patokan terhadap harga buy order pada CS Float ditambah dengan Fee. Tentunya harga juga bergantung pada supply dan demand suatu barang.",
      noAccess: "Untuk yang tidak memiliki akses pada CSFloat, berikut penetapan harga secara general:",
      sellTitle: "SELL/CASHOUT",
      sellPrice: "Steam Price × 60% (60% dari harga steam saat ini)",
      buyTitle: "BUY/TRADE",
      buyPrice: "Steam Price × 80% (80% dari harga steam saat ini)",
      disclaimer: "*Harga tersebut merupakan gambaran kotor, sebagian besar bergantung kepada kesepakatan bersama"
    },

    terms: {
      title: "BACA SEBELUM TRANSAKSI",
      subtitle: "Ketentuan penting yang harus dipahami",

      intro: "Kustomer diharapkan telah memahami cara dan menyepakati keputusan yang telah dibuat ketika melakukan transaksi.",

      warningTitle: "PENTING:",
      warning: "DILARANG UNTUK MELAKUKAN TRADE REVERSAL tanpa konfirmasi. Jika dilakukan maka konsekuensi berupa kerusakan reputasi terhadap akun Steam Anda dan transaksi kedepannya.",

      generalTitle: "Ketentuan Umum:",
      general: [
        "Semua trade bersifat final setelah selesai via Steam",
        "Kami berhak menolak layanan kepada siapa pun"
      ],

      yourTitle: "Tanggung Jawab Kamu:",
      your: [
        "Pastikan akun Steam kamu aman dan siap trade",
        "Berikan info akurat tentang skin kamu",
        "Selesaikan trade dalam waktu yang disepakati",
        "JANGAN coba trade reversal"
      ],

      ourTitle: "Komitmen Kami:",
      our: [
        "Semua pembayaran diproses aman dan cepat",
        "Layanan profesional dan komunikasi jelas",
        "Privacy dijaga - data kamu gak akan dishare",
        "Harga adil berdasarkan kondisi pasar nyata"
      ]
    },

    contact: {
      title: "Hubungi Kami",
      discord: "Discord",
      twitter: "Twitter / X",
      steam: "Steam"
    },

    footer: {
      copyright: "© 2025 LILO Store. All rights reserved. Sell Your Skins FAST."
    }
  }
};

function Home({ lang, theme, toggleTheme, toggleLang }) {
  const [activeSection, setActiveSection] = useState(null);
  const t = translations[lang];

  // Official Brand Icon Components
  const DiscordIcon = () => (
    <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );

  const XTwitterIcon = () => (
    <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26l8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  const SteamIcon = () => (
    <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59c.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524c2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159c0 1.875-1.515 3.396-3.39 3.396c-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25c1.297.539 2.793-.076 3.332-1.375c.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455c-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015c-1.665 0-3.015 1.353-3.015 3.015c0 1.665 1.35 3.015 3.015 3.015c1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266c1.249 0 2.266 1.014 2.266 2.266c0 1.251-1.017 2.265-2.266 2.265c-1.253 0-2.265-1.014-2.265-2.265z"/>
    </svg>
  );

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      {/* Main Content */}
      <main className="main-content">

        {/* SELL SECTION - PRIORITY */}
        <section className="section sell-section">
          <button
            className="section-header sell-header"
            onClick={() => toggleSection('sell')}
          >
            <div className="section-header-content">
              <TrendingUp className="section-icon" />
              <h2>{t.menu.sell}</h2>
            </div>
            <ChevronRight className={`chevron ${activeSection === 'sell' ? 'rotated' : ''}`} />
          </button>

          <div className={`section-content ${activeSection === 'sell' ? 'active' : ''}`}>
            <div className="section-intro">
              <h3 className="section-title">{t.sell.title}</h3>
              <p className="section-subtitle">{t.sell.subtitle}</p>
            </div>

            <div className="steps-container">
              {t.sell.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="step-card sell-step">
                    <div className="step-number">{idx + 1}</div>
                    <div className="step-icon-wrapper">
                      {idx === 0 && <img src={akImage} alt="AK-47" className="step-icon ak-icon" />}
                      {idx === 1 && <DollarSign className="step-icon instant-icon" />}
                      {idx === 2 && <CheckCircle className="step-icon" />}
                      {idx === 3 && <Send className="step-icon" />}
                      {idx === 4 && <CreditCard className="step-icon paid-icon" />}
                    </div>
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                  {idx < t.sell.steps.length - 1 && (
                    <div className="step-arrow">
                      <svg viewBox="0 0 24 24" className="arrow-svg">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor"/>
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* BUY/TRADE SECTION */}
        <section className="section buy-section">
          <button
            className="section-header buy-header"
            onClick={() => toggleSection('buy')}
          >
            <div className="section-header-content">
              <ChevronRight className="section-icon" />
              <h2>{t.menu.buy}</h2>
            </div>
            <ChevronRight className={`chevron ${activeSection === 'buy' ? 'rotated' : ''}`} />
          </button>

          <div className={`section-content ${activeSection === 'buy' ? 'active' : ''}`}>
            <div className="section-intro">
              <h3 className="section-title">{t.buy.title}</h3>
              <p className="section-subtitle">{t.buy.subtitle}</p>
            </div>

            <div className="steps-container">
              {t.buy.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="step-card buy-step">
                    <div className="step-number">{idx + 1}</div>
                    <div className="step-icon-wrapper">
                      {idx === 0 && <MessageCircle className="step-icon" />}
                      {idx === 1 && <Search className="step-icon" />}
                      {idx === 2 && <DollarSign className="step-icon" />}
                      {idx === 3 && <CreditCard className="step-icon" />}
                      {idx === 4 && <Package className="step-icon" />}
                    </div>
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                  {idx < t.buy.steps.length - 1 && (
                    <div className="step-arrow">
                      <svg viewBox="0 0 24 24" className="arrow-svg">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor"/>
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* LOANS SECTION */}
        <section className="section loans-section">
          <button
            className="section-header loans-header"
            onClick={() => toggleSection('loans')}
          >
            <div className="section-header-content">
              <Briefcase className="section-icon" />
              <h2>{t.menu.loans}</h2>
            </div>
            <ChevronRight className={`chevron ${activeSection === 'loans' ? 'rotated' : ''}`} />
          </button>

          <div className={`section-content ${activeSection === 'loans' ? 'active' : ''}`}>
            <div className="section-intro">
              <h3 className="section-title">{t.loans.title}</h3>
              <p className="section-subtitle">{t.loans.subtitle}</p>
            </div>

            <div className="text-content">
              <p className="policy-text">{t.loans.intro}</p>

              <h4 className="content-heading">{t.loans.exampleTitle}</h4>
              <ul className="steps-list">
                {t.loans.example.map((line, idx) => (
                  line ? <li key={idx}>{line}</li> : <br key={idx} />
                ))}
              </ul>

              <p className="policy-text" style={{ marginTop: '20px', fontWeight: '600' }}>{t.loans.option}</p>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="section pricing-section">
          <button
            className="section-header pricing-header"
            onClick={() => toggleSection('pricing')}
          >
            <div className="section-header-content">
              <BadgeDollarSign className="section-icon" />
              <h2>{t.menu.pricing}</h2>
            </div>
            <ChevronRight className={`chevron ${activeSection === 'pricing' ? 'rotated' : ''}`} />
          </button>

          <div className={`section-content ${activeSection === 'pricing' ? 'active' : ''}`}>
            <div className="section-intro">
              <h3 className="section-title">{t.pricing.title}</h3>
              <p className="section-subtitle">{t.pricing.subtitle}</p>
            </div>

            <div className="text-content">
              <p className="policy-text">{t.pricing.intro}</p>
              <p className="policy-text">{t.pricing.transparency}</p>
              <p className="policy-text">{t.pricing.noAccess}</p>

              <h4 className="content-heading">{t.pricing.sellTitle}</h4>
              <p className="policy-text">{t.pricing.sellPrice}</p>

              <h4 className="content-heading">{t.pricing.buyTitle}</h4>
              <p className="policy-text">{t.pricing.buyPrice}</p>

              <p className="policy-text" style={{ fontStyle: 'italic', marginTop: '20px' }}>{t.pricing.disclaimer}</p>
            </div>
          </div>
        </section>

        {/* TERMS SECTION */}
        <section className="section terms-section">
          <button
            className="section-header terms-header"
            onClick={() => toggleSection('terms')}
          >
            <div className="section-header-content">
              <FileText className="section-icon" />
              <h2>{t.menu.terms}</h2>
            </div>
            <ChevronRight className={`chevron ${activeSection === 'terms' ? 'rotated' : ''}`} />
          </button>

          <div className={`section-content ${activeSection === 'terms' ? 'active' : ''}`}>
            <div className="section-intro">
              <h3 className="section-title">{t.terms.title}</h3>
              <p className="section-subtitle">{t.terms.subtitle}</p>
            </div>

            <div className="text-content terms-content">
              <p className="policy-text">{t.terms.intro}</p>

              <div style={{
                background: 'rgba(200, 121, 65, 0.1)',
                border: '2px solid var(--orange-mid)',
                borderRadius: '6px',
                padding: '16px',
                marginTop: '20px',
                marginBottom: '24px'
              }}>
                <h4 className="content-heading" style={{ marginTop: '0', color: 'var(--orange-mid)' }}>{t.terms.warningTitle}</h4>
                <p className="policy-text" style={{ marginBottom: '0', fontWeight: '600' }}>{t.terms.warning}</p>
              </div>

              <h4 className="content-heading">{t.terms.generalTitle}</h4>
              <ul className="terms-list">
                {t.terms.general.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h4 className="content-heading">{t.terms.yourTitle}</h4>
              <ul className="terms-list">
                {t.terms.your.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h4 className="content-heading">{t.terms.ourTitle}</h4>
              <ul className="terms-list">
                {t.terms.our.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section">
          <h3 className="contact-title">{t.contact.title}</h3>
          <div className="contact-grid">
            <a href="https://discord.com/users/438736862065197058" target="_blank" rel="noopener noreferrer" className="contact-card discord-card">
              <DiscordIcon />
              <span className="contact-label">{t.contact.discord}</span>
            </a>
            <a href="https://x.com/cs_Lilo" target="_blank" rel="noopener noreferrer" className="contact-card twitter-card">
              <XTwitterIcon />
              <span className="contact-label">{t.contact.twitter}</span>
            </a>
            <a href="https://steamcommunity.com/profiles/76561198418933474/" target="_blank" rel="noopener noreferrer" className="contact-card steam-card">
              <SteamIcon />
              <span className="contact-label">{t.contact.steam}</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">{t.footer.copyright}</p>
      </footer>
    </>
  );
}

export default Home;
