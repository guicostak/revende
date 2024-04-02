package com.revende.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryEnum {
    SHOWS_E_FESTAS(1, "Shows e Festas"),
    ESPETACULO_E_TEATRO(2, "Espetaculo e Teatro"),
    EVENTOS_ESPORTIVOS(3, "Eventos Esportivos"),
    STANDUP_E_COMEDIA(4, "Stand Up e Comedia"),
    PALESTRAS_E_SEMINARIOS(5, "Palestras e Seminarios"),
    OUTRAS_CATEGORIAS(6, "Outras Categorias");

    private final Integer id;
    private final String name;
}
