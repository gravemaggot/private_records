// Images

function handleFiles(files) {
    var preview = document.getElementById("preview");

    preview.innerHTML = ""

    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (!file.type.startsWith('image/')){ continue }

        var img = document.createElement("img");
        img.classList.add("img-fluid");
        img.style.maxWidth = "200px"
        img.file = file;

        preview.appendChild(img); // Предполагается, что "preview" это div, в котором будет отображаться содержимое.

        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
    }
}

// Inputs

function validateEmail(mail)
{
    if(mail==""){
        return (true)
    }

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    {
        document.getElementById("email_error").hidden = true;
        return (true)
    }

    document.getElementById("email_error").hidden = false;
    return (false)
}

function fill_residence_adr() {
    document.getElementById("candidate_residence_city").value       = document.getElementById("candidate_registration_city").value
    document.getElementById("candidate_residence_street").value     = document.getElementById("candidate_registration_street").value
    document.getElementById("candidate_residence_house").value     = document.getElementById("candidate_registration_house").value
    document.getElementById("candidate_residence_apartment").value  = document.getElementById("candidate_registration_apartment").value

    return (false) // Стандартная обработка
}

function get_gender_on_change_name() {
    var result;

    reqstr = "/microservices/gender/?" +
        "firstname="  + document.getElementById("candidate_first_name").value+"&"+ 
        "lastname="   + document.getElementById("candidate_last_name").value+"&"+
        "middlename=" + document.getElementById("candidate_sur_name").value+"&";
    
    xhr = new XMLHttpRequest;
    xhr.open('GET', reqstr, false);
    xhr.send();
    if (xhr.status != 200) {
        console.log(`Ошибка при получении пола (${xhr.status}): ${xhr.statusText}`);
    } else {
        result = xhr.response;
    }

    el_candidate_gender = document.getElementById("candidate_gender");
    if (result=="male") {
        el_candidate_gender.value = "Мужской";
    }else if (result=="female"){
        el_candidate_gender.value = "Женский";
    }else{
        el_candidate_gender.value = "";
    }
}

// Tables

function add_relatives_table_new_row(){
    tableBody = document.getElementById("relatives_rows")

    var count = tableBody.childNodes.length;

    rowElement = document.createElement("tr")
    rowElement.innerHTML =
        '<th scope="row"><select class="form-control" type="text" id="relatives_' + String(count-1) + '_type" name="relatives[' + String(count-1) + '][type]"></select></th>' +
        '<td><input class="form-control" type="text" id="relatives_' + String(count-1)  + '_name" name="relatives[' + String(count-1)  + '][name]"></input></td>' +
        '<td><input class="form-control" type="date" id="relatives_' + String(count-1)  + '_date" name="relatives[' + String(count-1)  + '][date]"></input></td>' +
        '<td><input class="form-control" type="text" id="relatives_' + String(count-1)  + '_job"  name="relatives[' + String(count-1)  + '][job]"></input></td>' +
        '<td><input class="form-control" type="text" id="relatives_' + String(count-1)  + '_adr"  name="relatives[' + String(count-1)  + '][adr]"></input></td>' +
        '<td><a class="delete" title="Удалить" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';

    opts = "Жена,Муж,Сын,Дочь,Мать,Отец,Брат,Сестра".split(",");
    for (var ind in opts){
        rowElement.childNodes[0].childNodes[0].innerHTML = rowElement.childNodes[0].innerHTML + '<option>' + opts[ind] + '</option>';
    }

    tableBody.appendChild(rowElement);

    return (false)
}

function add_education_table_new_row(position_type=""){
    tableBody = document.getElementById("education_rows")

    var count = tableBody.childNodes.length;

    rowElement = document.createElement("tr")

    if (position_type == "worker"){
        rowElement.innerHTML =
        '<td><input class="form-control" type="number" id="education_' + String(count-1)  + '_begin" name="education[' + String(count-1)  + '][begin]"></input></td>' +
        '<td><input class="form-control" type="number" id="education_' + String(count-1)  + '_end" name="education[' + String(count-1)    + '][end]"></input></td>' +
        '<td><input class="form-control" type="text" id="education_' + String(count-1)  + '_inst" name="education[' + String(count-1)   + '][inst]"></input></td>' +
        '<td><input class="form-control" type="text" id="education_' + String(count-1)  + '_spec"  name="education[' + String(count-1)  + '][spec]"></input></td>' +
        '<td><a class="delete" title="Удалить" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';
    }else{
        rowElement.innerHTML =
        '<td><input class="form-control" type="number" id="education_' + String(count-1)  + '_begin" name="education[' + String(count-1)  + '][begin]"></input></td>' +
        '<td><input class="form-control" type="number" id="education_' + String(count-1)  + '_end" name="education[' + String(count-1)    + '][end]"></input></td>' +
        '<td><input class="form-control" type="text" id="education_' + String(count-1)  + '_inst" name="education[' + String(count-1)   + '][inst]"></input></td>' +
        '<td><input class="form-control" type="text" id="education_' + String(count-1)  + '_spec"  name="education[' + String(count-1)  + '][spec]"></input></td>' +
        '<td><select class="form-control" type="text" id="education_' + String(count-1) + '_form"  name="education[' + String(count-1)  + '][form]"></select></td>' +
        '<td><a class="delete" title="Удалить" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';

        opts = "Очная,Заочная,Вечерняя,Удаленная".split(",");

        for (var ind in opts){
            rowElement.childNodes[4].childNodes[0].innerHTML = rowElement.childNodes[4].innerHTML + '<option>' + opts[ind] + '</option>';
        }
    }

    tableBody.appendChild(rowElement);

    return (false)
}

function add_extra_table_new_row(position_type=""){
    tableBody = document.getElementById("extra_rows")

    var count = tableBody.childNodes.length;

    rowElement = document.createElement("tr")

    if (position_type == "worker"){
        rowElement.innerHTML =
        '<td><input class="form-control" type="number" id="extra_' + String(count-1)  + '_year" name="extra[' + String(count-1)  + '][year]"></input></td>' +
        '<td><input class="form-control" type="text" id="extra_' + String(count-1)  + '_inst" name="extra[' + String(count-1)    + '][inst]"></input></td>' +
        '<td><input class="form-control" type="text" id="extra_' + String(count-1)  + '_name" name="extra[' + String(count-1)    + '][name]"></input></td>' +
        '<td><input class="form-control" type="text" id="extra_' + String(count-1)  + '_spec" name="extra[' + String(count-1)    + '][spec]"></input></td>' +
        '<td><a class="delete" title="Удалить" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';
    }else{
        rowElement.innerHTML =
        '<td><input class="form-control" type="number" id="extra_' + String(count-1)  + '_year" name="extra[' + String(count-1)       + '][year]"></input></td>' +
        '<td><input class="form-control" type="text" id="extra_' + String(count-1)  + '_inst" name="extra[' + String(count-1)         + '][inst]"></input></td>' +
        '<td><input class="form-control" type="text" id="extra_' + String(count-1)  + '_name" name="extra[' + String(count-1)         + '][name]"></input></td>' +
        '<td><input class="form-control" type="number" id="extra_' + String(count-1)  + '_duration" name="extra[' + String(count-1)   + '][duration]"></input></td>' +
        '<td><a class="delete" title="Удалить" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';
    }

    tableBody.appendChild(rowElement);

    return (false)
}

function add_language_table_new_row(){
    tableBody = document.getElementById("language_rows");

    var count = tableBody.childNodes.length;

    rowElement = document.createElement("tr");
    rowElement.innerHTML =
        '<td><input class="form-control" type="text" id="language_'                   
            + String(count-1)  + '_name" name="language['     
            + String(count-1) + '][name]" ></input></td>' +
        '<td><input class="form-control" type="number" min="1" max="5" id="language_' 
            + String(count-1)  + '_orally" name="language['   
            + String(count-1) + '][orally]" onblur="this.value = Math.min(5, Math.max(this.value, 1))"></input></td>'+
        '<td><input class="form-control" type="number" min="1" max="5" id="language_' 
            + String(count-1)  + '_writing" name="language['  
            + String(count-1) + '][writing]" onblur="this.value = Math.min(5, Math.max(this.value, 1))"></input></td>'+
        '<td><a class="delete" title="Удалить" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';

    tableBody.appendChild(rowElement);

    return (false)
}

function add_experience_table_row(position_type=""){
    tableBody = document.getElementById("experience_fields");

    if (tableBody){
        var count = tableBody.childNodes.length;

        count = count / 6;

        tableBody.appendChild(document.createElement("br"));

        rowElement = document.createElement("div");
        rowElement.classList.add("form-row");

        rowElement.innerHTML =
            '<div class="form-group col-md-2">' +
            '   <label for="expieience' + String(count) + 'Name">Название организации(' + String(count + 1) + ') *</label>' +
            '</div>' + 
            '<div class="form-group col-md-9">' +
            '   <input class="form-control" type="text" id="experience_' + String(count) + '_name" name="experience[' + String(count) + '][name]">' +
            '</div>' +
            '<div class="form-group col-md-1">' +
            '   <a class="delete" title="Удалить" data-toggle="tooltip">' + 
            '       <i class="material-icons" style="color:red"></i>' + 
            '   </a>' +
            '</div>';

        tableBody.appendChild(rowElement);

        rowElement = document.createElement("div");
        rowElement.classList.add("form-row");

        if (position_type == "worker"){
            rowElement.innerHTML =
                '<div class="form-group col-md-3">' +
                '   <label for="expieience1PeriodStart">Период работы c (можно первое число месяца и года) *</label>' +
                '</div>' +
                '<div class="form-group col-md-2">' +
                '   <input class="form-control" type="date" id="experience_' + String(count) + '_period_start" name="experience['+ String(count) + '][period_start]">' +
                '</div>' +
                '<div class="form-group col-md-1">' +
                '   <label for="expieience' + String(count) + 'PeriodFinish">по *</label>' +
                '</div>' +
                '<div class="form-group col-md-2">' +
                '   <input class="form-control" type="date" id="experience_' + String(count) + '_period_finish" name="experience['+ String(count) + '][period_finish]">' +
                '';
        }else{
            rowElement.innerHTML =
                '<div class="form-row"><div class="form-group col-md-3">' +
                '   <label for="expieience1PeriodStart">Период работы c (можно первое число месяца и года) *</label>' +
                '</div>' +
                '<div class="form-group col-md-2">' +
                '   <input class="form-control" type="date" id="experience_' + String(count) + '_period_start" name="experience['+ String(count) + '][period_start]">' +
                '</div>' +
                '<div class="form-group col-md-1">' +
                '   <label for="expieience' + String(count) + 'PeriodFinish">по *</label>' +
                '</div>' +
                '<div class="form-group col-md-2">' +
                '   <input class="form-control" type="date" id="experience_' + String(count) + '_period_finish" name="experience['+ String(count) + '][period_finish]">' +
                '</div>' +
                '<div class="form-group col-md-1">' +
                '   <label for="expieience' + String(count) + 'Workers">сотруд-\nников *</label>' +
                '</div>' +
                '<div class="form-group col-md-1">' +
                '   <input class="form-control" type="number" id="experience_' + String(count) + '_workers" name="experience['+ String(count) + '][workers]">' +
                '</div>' +
                '<div class="form-group col-md-1">' +
                '   <label for="expieience' + String(count) + 'Subords">подчи-\nненных *</label>' +
                '</div>' +
                '<div class="form-group col-md-1">' +
                '   <input class="form-control" type="number" id="experience_' + String(count) + '_subords" name="experience['+ String(count) + '][subords]">' +
                '</div>' +
                '';
        }

        tableBody.appendChild(rowElement);

        rowElement = document.createElement("div");
        rowElement.classList.add("form-row");

        if (position_type == "worker"){
            rowElement.innerHTML =
                '<div class="form-group col-md-3">' +
                '   <label for="expieience' + String(count) + 'Pos">Должность *</label>' +
                '</div>' +
                '<div class="form-group col-md-9">' +
                '   <input class="form-control" type="text" id="experience_' + String(count) + '_pos" name="experience['+ String(count) + '][pos]">' +
                '</div>' +
                '';
        }else{
            rowElement.innerHTML =
                '<div class="form-group col-md-3">' +
                '   <label for="expieience' + String(count) + 'Field">Сфера деятельности *</label>' +
                '</div>' +
                '<div class="form-group col-md-3">' +
                '   <input class="form-control" type="text" id="experience_' + String(count) + '_field" name="experience['+ String(count) + '][field]">' +
                '</div>' +
                '<div class="form-group col-md-2">' +
                '   <label for="expieience' + String(count) + 'Pos">Должность *</label>' +
                '</div>' +
                '<div class="form-group col-md-4">' +
                '   <input class="form-control" type="text" id="experience_' + String(count) + '_pos" name="experience['+ String(count) + '][pos]">' +
                '</div>' +
                '';
        }
                
        tableBody.appendChild(rowElement);

        rowElement = document.createElement("div");
        rowElement.classList.add("form-row");
        
        if (position_type == "worker"){
            rowElement.innerHTML =
                '<div class="form-group col-md-3">' +
                '   <label for="expieience' + String(count) + 'Dism">Причины \nувольнения *</label>' +
                '</div>' +
                '<div class="form-group col-md-9">' +
                '   <input class="form-control" type="text" id="experience_' + String(count) + '_dism" name="experience['+ String(count) + '][dism]">' +
                '</div>' +
                '';
        }else{
            rowElement.innerHTML =
                '<div class="form-group col-md-3">' +
                '   <label for="expieience' + String(count) + 'Cond">Зарплата *</label>' +
                '</div>' +
                '<div class="form-group col-md-3">' +
                '   <input class="form-control" type="number" id="experience_' + String(count) + '_cond" name="experience['+ String(count) + '][cond]">' +
                '</div>' +
                '<div class="form-group col-md-2">' +
                '   <label for="expieience' + String(count) + 'Dism">Причины \nувольнения *</label>' +
                '</div>' +
                '<div class="form-group col-md-4">' +
                '   <input class="form-control" type="text" id="experience_' + String(count) + '_dism" name="experience['+ String(count) + '][dism]">' +
                '</div>' +
                '';
        }

        tableBody.appendChild(rowElement);

        rowElement = document.createElement("div");
        rowElement.classList.add("form-row");
        rowElement.innerHTML =
            '<div class="form-group col-md-12">' +
            '<label for="expieience' + String(count) + 'Duties">Основные должностные обязанности *:</label>' +
            '<textarea class="form-control" type="text" id="experience_' + String(count) + '_duties" name="experience['+ String(count) + '][duties]"></textarea>' +
            '</div>'
            '<br />';
        tableBody.appendChild(rowElement);

    }

    return (false)
}

function add_reccomenders_table_row(){
    tableBody = document.getElementById("reccomenders_rows");

    var count = tableBody.childNodes.length;

    rowElement = document.createElement("tr")
    rowElement.innerHTML =
        '<td><input class="form-control" type="text" id="reccomenders_' + String(count-1)  + '_name" name="reccomenders['     + String(count-1)  + '][name]"></input></td>' +
        '<td><input class="form-control" type="text" id="reccomenders_' + String(count-1)  + '_job" name="reccomenders['      + String(count-1)  + '][job]"></input></td>' +
        '<td><input class="form-control" type="text" id="reccomenders_' + String(count-1)  + '_position" name="reccomenders[' + String(count-1)  + '][position]"></input></td>' +
        '<td><input class="form-control" type="text" id="reccomenders_' + String(count-1)  + '_phone"  name="reccomenders['   + String(count-1)  + '][phone]"></input></td>'+
        '<td><a class="delete" title="Удалить" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>';

    tableBody.appendChild(rowElement);

    $("#reccomenders_" + String(count-1) + "_phone").mask("+375 (99) 999-99-99");

    return (false)
}

// Fill tables

function fill_relatives_content(contentElement){
    tableContent = JSON.parse(contentElement.innerHTML)

    if (tableContent == null){
        return
    }

    rowsElement = document.getElementById("relatives_rows")

    for (i=0;i<tableContent.length; i++){
        add_relatives_table_new_row()

        rowData = tableContent[i]

        rowElement = rowsElement.childNodes[rowsElement.childNodes.length-1]
        typeOptions = rowElement.childNodes[0].childNodes[0]

        for (n=0;n<typeOptions.childNodes.length-1;n++){
            option = typeOptions.childNodes[n]
            option.selected = (option.value == rowData["type"])
        }

        rowElement.childNodes[1].childNodes[0].value = rowData["name"]
        rowElement.childNodes[2].childNodes[0].value = rowData["date"]
        rowElement.childNodes[3].childNodes[0].value = rowData["job"]
        rowElement.childNodes[4].childNodes[0].value = rowData["adr"]
    }
}

function fill_education_content(contentElement, position_type){
    tableContent = JSON.parse(contentElement.innerHTML)

    if (tableContent == null){
        return
    }

    rowsElement = document.getElementById("education_rows")

    for (i=0;i<tableContent.length; i++){
        rowData = tableContent[i]

        add_education_table_new_row(position_type)

        rowElement = rowsElement.childNodes[rowsElement.childNodes.length-1]
        typeOptions = rowElement.childNodes[4].childNodes[0]

        if (position_type != "worker") {
            for (n=0;n<typeOptions.childNodes.length-1;n++){
                option = typeOptions.childNodes[n]
                option.selected = (option.value == rowData["form"])
            }
        }

        rowElement.childNodes[0].childNodes[0].value = rowData["begin"]
        rowElement.childNodes[1].childNodes[0].value = rowData["end"]
        rowElement.childNodes[2].childNodes[0].value = rowData["inst"]
        rowElement.childNodes[3].childNodes[0].value = rowData["spec"]
    }
}

function fill_extra_content(contentElement, position_type){
    tableContent = JSON.parse(contentElement.innerHTML)

    if (tableContent == null){
        return
    }

    rowsElement = document.getElementById("extra_rows")

    for (i=0;i<tableContent.length; i++){
        rowData = tableContent[i]

        add_extra_table_new_row(position_type)

        rowElement = rowsElement.childNodes[rowsElement.childNodes.length-1]

        rowElement.childNodes[0].childNodes[0].value = rowData["year"]
        rowElement.childNodes[1].childNodes[0].value = rowData["inst"]
        rowElement.childNodes[2].childNodes[0].value = rowData["name"]
        rowElement.childNodes[3].childNodes[0].value = rowData["duration"]

        if (position_type == "worker") {
            rowElement.childNodes[3].childNodes[0].value = rowData["spec"]
        }
    }
}

function fill_language_content(contentElement){
    tableContent = JSON.parse(contentElement.innerHTML)

    if (tableContent == null){
        return
    }

    rowsElement = document.getElementById("language_rows")

    for (i=0;i<tableContent.length; i++){
        add_language_table_new_row()

        rowData = tableContent[i]

        rowElement = rowsElement.childNodes[rowsElement.childNodes.length-1]

        rowElement.childNodes[0].childNodes[0].value = rowData["name"]
        rowElement.childNodes[1].childNodes[0].value = rowData["orally"]
        rowElement.childNodes[2].childNodes[0].value = rowData["writing"]
    }
}

function fill_reccomenders_content(contentElement){
    tableContent = JSON.parse(contentElement.innerHTML)

    if (tableContent == null){
        return
    }

    rowsElement = document.getElementById("reccomenders_rows")

    for (i=0;i<tableContent.length; i++){
        add_reccomenders_table_row()

        rowData = tableContent[i]

        rowElement = rowsElement.childNodes[rowsElement.childNodes.length-1]

        rowElement.childNodes[0].childNodes[0].value = rowData["name"]
        rowElement.childNodes[1].childNodes[0].value = rowData["job"]
        rowElement.childNodes[2].childNodes[0].value = rowData["position"]
        rowElement.childNodes[3].childNodes[0].value = rowData["phone"]
    }
}

function fill_experience_content(contentElement, position_type){
    tableContent = JSON.parse(contentElement.innerHTML)

    if (tableContent == null){
        return
    }

    rowsElement = document.getElementById("experience_fields")

    if (tableContent.length == 0){
        add_experience_table_row(position_type)
    }

    for (i=0;i<tableContent.length; i++){
        add_experience_table_row(position_type)

        rowData = tableContent[i]

        rowsElement.childNodes[rowsElement.childNodes.length-5].childNodes[1].childNodes[1].value = rowData["name"]

        if (position_type == "worker") {
            rowsElement.childNodes[rowsElement.childNodes.length-4].childNodes[1].childNodes[1].value = rowData["period_start"]
            rowsElement.childNodes[rowsElement.childNodes.length-4].childNodes[3].childNodes[1].value = rowData["period_finish"]
            rowsElement.childNodes[rowsElement.childNodes.length-3].childNodes[1].childNodes[1].value = rowData["pos"]
            rowsElement.childNodes[rowsElement.childNodes.length-2].childNodes[1].childNodes[1].value = rowData["dism"]
        }else{
            rowsElement.childNodes[rowsElement.childNodes.length-4].childNodes[0].childNodes[1].childNodes[1].value = rowData["period_start"]
            rowsElement.childNodes[rowsElement.childNodes.length-4].childNodes[0].childNodes[3].childNodes[1].value = rowData["period_finish"]
            rowsElement.childNodes[rowsElement.childNodes.length-4].childNodes[0].childNodes[5].childNodes[1].value = rowData["workers"]
            rowsElement.childNodes[rowsElement.childNodes.length-4].childNodes[0].childNodes[7].childNodes[1].value = rowData["subords"]
            rowsElement.childNodes[rowsElement.childNodes.length-3].childNodes[1].childNodes[1].value = rowData["field"]
            rowsElement.childNodes[rowsElement.childNodes.length-2].childNodes[1].childNodes[1].value = rowData["cond"]
            rowsElement.childNodes[rowsElement.childNodes.length-3].childNodes[3].childNodes[1].value = rowData["pos"]
            rowsElement.childNodes[rowsElement.childNodes.length-2].childNodes[3].childNodes[1].value = rowData["dism"]
        }
        rowsElement.childNodes[rowsElement.childNodes.length-1].childNodes[0].childNodes[1].value = rowData["duties"]
    }

    set_delete_events()
}

function remove_expirience_row(num){
    rowsElement = document.getElementById("experience_fields")    
    for (i=1; i<=6; i++){
        rowsElement.removeChild(rowsElement.childNodes[(num+1)*6-i])    
    }

    set_delete_events()
}

function set_delete_events(){
    rowsElement = document.getElementById("experience_fields")
    iconsList = rowsElement.querySelectorAll("a")
    for (i=0; i < iconsList.length; i++){
        iconsList[i].childNodes[1].onclick = get_delete_function(i)
    }

    return (false)
}

function get_delete_function(i){
    return function(){
        remove_expirience_row(i)    
    }
}

// Write Candidate

function  deactive_candidate(){
    document.getElementById("candidate_active").value = "false"
    return (true)
}

// Consense personal data
function  consense_sure(){
    document.getElementById("candidate_data_verification").value = "true"
    document.getElementById("candidate_data_verification_date").value = (new Date).toISOString()
    return (true)
}

function validate_sure_checks() {
    all_sure = true;

    check_isd = ["operator_sure", "polit_sure", "cansel_sure"]
    for (id in check_isd) {
        check_id = check_isd[id]
        check_element = document.getElementById(check_id)
        if (check_element) {
            all_sure = all_sure && check_element.checked 
        }
    }

    sure_button = document.getElementById("sure_button")
    if (sure_button){
        sure_button.disabled = !(all_sure)    
    }

    return (true)
}

// Validation

function add_validation_tags(validate_fields){
    if (validate_fields == null){
        return
    }

    fields = validate_fields.value.replace(/\:/g,'').replace(/\[/g,'').replace(/\]/g,'').split(", ")
    for (i in fields) {
        el = document.getElementById("candidate_" + fields[i])
        if (el){
            if (el.className.indexOf("table table-bordered") > -1){
                el.classList.value = "table table-danger table-responsive"
                set_required_for_fields(el, ["input", "textarea"])
                if (el.id == "candidate_relatives") {
                    if(document.getElementById("is_worker") != null){
                        alert_template = "ВАЖНО! Максимально подробно укажите близких родственников: родителей, супруга/супругу, детей (при наличии). Братьев и сестер."    
                    }
                    else if (document.getElementById("candidate_marital_status").value=="Замужем, женат"){
                        if(document.getElementById("candidate_gender").value=="Мужской"){
                            alert_template = "ВАЖНО! Максимально подробно укажите близких родственников: родителей, жену, детей (при наличии). Братьев и сестер."
                        }else if (document.getElementById("candidate_gender").value=="Женский"){
                            alert_template = "ВАЖНО! Максимально подробно укажите близких родственников: родителей, мужа, детей (при наличии). Братьев и сестер."
                        }else{
                            alert_template = "ВАЖНО! Максимально подробно укажите близких родственников: родителей, братьев и сестер."
                        }
                    }else{
                        alert_template = "ВАЖНО! Максимально подробно укажите близких родственников: родителей, братьев и сестер."
                    }
                    
                    alert_el = document.getElementById("relatives_error")
                    alert_el.hidden = false
                    alert_el.innerHTML = alert_template

                }
            }else if (el.className.indexOf("input-group-prepend") > -1){
                el.parentElement.parentElement.parentElement.querySelectorAll("label")[0].style = "color:#dc3545"
                el.style = "color:#dc3545"
            }else if(fields[i] == "desired_pay_system"){
                sel = el.querySelectorAll("label")
                for (sel_i in sel){
                    sel[sel_i].style = "color:#dc3545"
                }
            }
            el.setAttribute('required', '')
        }else if(fields[i] == "experience"){
            el = document.getElementById("experience_fields") 
            set_required_for_fields(el, ["input", "textarea"])
        }
    }
}

 function set_required_for_fields(table_el, types){
    for (typeI in types) { 
        selectType = types[typeI]
        inputSelector = table_el.querySelectorAll(selectType);
        for (j in inputSelector) {
            if (+/\d+/.exec(j) == j){
                childEl = inputSelector[j]
                if (childEl) {childEl.setAttribute('required', '')}
            }    
        } 
    }  
}

function switch_pills_on_last_field_and_focus(validate_fields, for_current = false){
    if (validate_fields == null){
        return false
    }

    position_type = ""
    if (document.getElementById("is_worker") != null){
        position_type = "worker"
    }

    fieldname = get_first_by_pills(validate_fields.value.replace(/\:/g,'').replace(/\[/g,'').replace(/\]/g,'').split(", "), for_current, position_type)
    if (fieldname == null){
        return false
    }
    
    $(pills_cathegory(fieldname)).tab('show')

    el = document.getElementById("candidate_"+fieldname)

    let focusedElement

    if (fieldname == "experience"){
        el = document.getElementById("experience_fields")
    }

    if (el) {
        if (el.className.indexOf("table table-") > -1 || el.id == "experience_fields"){
            inputSelector = el.querySelectorAll("input")
            if (inputSelector.length == 0){
                add_new_row_to_tab(el.id, position_type)
                set_required_for_fields(el, ["input", "text"])  
                
                inputSelector = el.querySelectorAll("input")
            }
            focusedElement = inputSelector[0]
        }else{
            focusedElement = el    
        }
    }

    if (focusedElement){        
        nextEl = focusedElement.nextElementSibling
        if (nextEl != null){
            if (nextEl.className != "invalid-tooltip"){
                focusedElement.parentElement.insertBefore(get_div_element_invalid_tooltip(), nextEl)    
            }
        }else{
            focusedElement.parentElement.appendChild(get_div_element_invalid_tooltip())    
        }
        setTimeout(function(){focusedElement.focus()}, 1000) 
    }

    return true
}

function get_div_element_invalid_tooltip(){
    invalidTooltip = document.createElement("div")
    invalidTooltip.className = "invalid-tooltip"
    invalidTooltip.innerText = "Заполните это поле"

    return invalidTooltip
}

function add_new_row_to_tab(id, position_type) {
    methodsForTabs = {
        "candidate_experience"      : add_experience_table_row,
        "candidate_relatives"       : add_relatives_table_new_row,
        "candidate_education"       : add_education_table_new_row,
        "candidate_extra"           : add_extra_table_new_row,
        "candidate_language"        : add_language_table_new_row,
        "candidate_reccomenders"    : add_reccomenders_table_row,
    }

    method = methodsForTabs[id]
    if (method){
        method.call(this, position_type)
    }
}

function get_first_by_pills(fields, for_current = false, position_type = ""){
    if (for_current){
        have_pills = [get_tab_pill_for_current_tab(position_type)]
    }else{
        have_pills = []
        for (i in fields){
            fieldname = fields[i]
            cathegory = pills_cathegory(fieldname)
            if (have_pills.indexOf(cathegory) == -1) {
                have_pills[have_pills.length] = cathegory 
            }  
        }
    }

    have_pills.sort() 

    for (i in fields){
        fieldname = fields[i]
        if (pills_cathegory(fieldname) == have_pills[0]){
            return fieldname
        }
    } 
}

function get_tab_pill_for_current_tab(position_type){

    current_tab = document.getElementsByClassName("tab-pane fade active show")[0].id

    if (position_type != "worker"){
        pills_hash = {
            "pills-general-information"     : "#pills-tab li:nth-child(1) a",
            "pills-education"               : "#pills-tab li:nth-child(2) a",
            "pills-skills"                  : "#pills-tab li:nth-child(3) a",
            "pills-experience"              : "#pills-tab li:nth-child(4) a",
            "pills-recommendations"         : "#pills-tab li:nth-child(5) a",
            "pills-additional-information"  : "#pills-tab li:nth-child(6) a"
        }
    }else{
        pills_hash = {
            "pills-general-information"     : "#pills-tab li:nth-child(1) a",
            "pills-education"               : "#pills-tab li:nth-child(2) a",
            "pills-experience"              : "#pills-tab li:nth-child(3) a",
            "pills-recommendations"         : "#pills-tab li:nth-child(4) a",
            "pills-additional-information"  : "#pills-tab li:nth-child(5) a"
        }
    }

    return pills_hash[current_tab]
}

function pills_cathegory(fieldname){
    if (document.getElementById("is_worker") == null){
        cathegory_hash = {      
            "education"                             : '#pills-tab li:nth-child(2) a',    
            "language"                              : '#pills-tab li:nth-child(3) a',    
            "word_level"                            : '#pills-tab li:nth-child(3) a',    
            "excel_level"                           : '#pills-tab li:nth-child(3) a',    
            "access_level"                          : '#pills-tab li:nth-child(3) a',    
            "_1c_level"                             : '#pills-tab li:nth-child(3) a',    
            "experience"                            : '#pills-tab li:nth-child(4) a',    
            "ready_to_start_work"                   : '#pills-tab li:nth-child(6) a',    
            "last_average_monthly_income"           : '#pills-tab li:nth-child(6) a',    
            "data_verification"                     : '#pills-tab li:nth-child(6) a',    
            "trial_period_salaries"                 : '#pills-tab li:nth-child(6) a',    
            "post_trial_salaries"                   : '#pills-tab li:nth-child(6) a',    
            "desired_pay_system"                    : '#pills-tab li:nth-child(6) a',    
            "overtime_work"                         : '#pills-tab li:nth-child(6) a',    
            "business_trips"                        : '#pills-tab li:nth-child(6) a',    
            "training"                              : '#pills-tab li:nth-child(6) a'    
        }
    }else{
        cathegory_hash = {
            "education"                             : '#pills-tab li:nth-child(2) a',
            "experience"                            : '#pills-tab li:nth-child(3) a',
            "ready_to_start_work"                   : '#pills-tab li:nth-child(6) a',
            "bad_habits"                            : '#pills-tab li:nth-child(6) a',
            "health_status"                         : '#pills-tab li:nth-child(6) a',
            "previous_conviction"                   : '#pills-tab li:nth-child(6) a',
            "administrative_penalties"              : '#pills-tab li:nth-child(6) a',
            "obligations_under_orders_of_execution" : '#pills-tab li:nth-child(6) a',
            "previous_job_disciplinary_penalties"   : '#pills-tab li:nth-child(6) a',
            "job_data_source"                       : '#pills-tab li:nth-child(6) a',
            "last_average_monthly_income"           : '#pills-tab li:nth-child(6) a',
            "data_verification"                     : '#pills-tab li:nth-child(6) a',
            "trial_period_salaries"                 : '#pills-tab li:nth-child(6) a',
            "post_trial_salaries"                   : '#pills-tab li:nth-child(6) a',
            "desired_pay_system"                    : '#pills-tab li:nth-child(6) a',
            }
        }

    cathegory = cathegory_hash[fieldname]
    if (cathegory == null){
        cathegory = '#pills-tab li:nth-child(1) a'
    }

    return (cathegory)
}

function get_requred_inputs(){
    arr = []
    requiredEls = $('[required]')
    for (i = 0; i < requiredEls.length; i++){
        el = requiredEls[i]
        fieldname = el.id.substring("candidate_".length)
        if (el.value == ''){
            arr[arr.length] = { "name": fieldname, "page": pills_cathegory(fieldname)}
        }
    }
    return arr
}

function focus_on_required_input_not_this_page(){
    if (get_requred_inputs().length > 0){
        return false
    }
    return true
}

function save_data(){
    document.getElementsByTagName("form")[0].submit()    
}

function switch_to_next_pill_and_validate(){
    if (document.getElementsByTagName("form")[0].className == "was-validated" 
        && switch_pills_on_last_field_and_focus(document.getElementById("validate_fields"), true)){
        return false
    }

    nextTabNavi = get_next_tab_for_current_page()
    if (nextTabNavi){
        $(nextTabNavi).tab('show')
    }

    return false
}

function get_next_tab_for_current_page(){
    positionType = ""
    if (document.getElementById("is_worker") != null){
        positionType = "worker"
    }

    pillsPage = get_tab_pill_for_current_tab(positionType)
    if (!pillsPage){
        return
    }

    pillsNumber = +/\d+/.exec(pillsPage)
    if (pillsNumber > 5){
        return
    }

    nextPillPage = pillsPage.replace(pillsNumber, pillsNumber + 1)
    return nextPillPage
}
