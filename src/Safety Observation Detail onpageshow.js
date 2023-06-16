$("#text_113").text('Worksite :');
try {

  leftPanel();
  startCustomSpinner();
  debugger;
  var isLite = false;
  var isMobileView = false;
  var sPageURL = document.location.search;
  var baseURL = AFUtil.baseURL() + "s3download?action=download&version=0&path=";

  var responseSet = [];
  var defaultResponseSet = {
    attribute_1: "Default",
    foreign_key_id: "0",
    responses: [
      { attribute_1: "0", foreign_key_id: "PASS", attribute_2: "Pass", failed_response: "N", color: "rgb(191, 250, 191)", comments_required: "N", priority: "LOW", due_date: "7 Days" },
      { attribute_1: "0", foreign_key_id: "ATTN", attribute_2: "Needs attention", failed_response: "Y", color: "rgb(255, 191, 0)", comments_required: "Y", priority: "MEDIUM", due_date: "7 Days" },
      { attribute_1: "0", foreign_key_id: "IMATTN", attribute_2: "Needs immediate attention (within 24 hours)", failed_response: "Y", color: "rgb(255, 33, 33)", comments_required: "Y", priority: "HIGH", due_date: "7 Days" },
      { attribute_1: "0", foreign_key_id: "NI", attribute_2: "Not Completed", failed_response: "N", color: "rgb(155, 155, 155)", order: 10000, comments_required: "Y", priority: "LOW", due_date: "7 Days" }
    ]
  };
  var notCompleteReponse = { foreign_key_id: "NI", attribute_2: "Not Completed", failed_response: "N", color: "rgb(155, 155, 155)", order: 10000, comments_required: "Y", priority: "LOW", due_date: "7 Days" };
  var inspSchdAssocTable = [];
  $("#text_SOID").text(sessionStorage.getItem("nihse_soc_id"));
  
  function GetURLParameter(sParam) {
    if (sPageURL.indexOf('?') != -1) {
      sPageURL = sPageURL.split('+').join(' ');

      var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

      while (tokens = re.exec(sPageURL)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }
      return params[sParam];
    }

    return '';

  }


  var viewMode = GetURLParameter('View');

  if (viewMode === 'DETAIL') {
    isLite = false;
  }
  else {
    isLite = true;

  }


  if ((AFUtil.isOfflineAppClicked())) {
    //isLite = true;
    isMobileView = true;
  }

  $("#listview_images").addClass("hidden");
  //$("<div id='dim-bg' class='dim-open dim'></div>").insertAfter(".ui-content");
  //$(".signature-canvas-clear").hide();
  $("#back_button").appendTo($(".header-left"));
  $("#image_print").appendTo($(".header-right"));
  $("#image_print").click(function () {
    debugger
    window.print();
  })

  if ((AFUtil.isOfflineAppClicked()) || isMobile.any()) {
    $("#image_print").remove();
  }







  var inspectorDetails = [];
  var inspectorEmpDetails = [];
  var approverDetails = [];
  var basicDetails = {};
  var attachments = [];

  var GeneralDetails = {};
  var Sources = [];
  var ObservationHazard = [];
  var cntr = 0;
  var Resolution = {};


  var realMapData = outputField.mapData;
  outputField.mapData = function (ouputfields, data, appendType) {
    realMapData(ouputfields, data, appendType);
    if (typeof data === 'string') {
      data = $.parseJSON(data);
    }
    cntr++;
    debugger

    var strtbl = '';

    $.each(data.Output.table, function (index, value) {
      debugger

      strtbl = strtbl + ',' + value.name;

    });


    if (data.Output.field != undefined) {
      debugger
      if (data.Output.field[0] != undefined && data.Output.field[0].name == 'frequency') {
        if (data.Output.field[0].value === '') {
          $("#text_36").addClass('hidden');
          $("#lblFreq").addClass('hidden');
        }
      }
    }
    debugger
    //added for risk matrixbinding
    if ((data.Output.table[2] != undefined) && (data.Output.table[2].name != undefined) && (data.Output.table[2].name == "SequenceNumber")) {
      var i = 0;
      $("#sub_content .ui-grid-d").each(function (index, ele) {
        $(ele).find(".ui-bar").each(function (index, element) {

          //mobile device
          var labva = data.Output.table[2].row[i].score;
          if (labva.indexOf('AF') != -1) {
            labva = labva.split(':')[1].split(']')[0];
          }


          $(element).find(".lab").text(labva);
          var typeid = data.Output.table[2].row[i].nihseRiskMatrixLkupId;
          if (typeid.indexOf('AF') != -1) {
            typeid = typeid.split(':')[1].split(']')[0];
          }
          $(element).find(".score-id").text(typeid);

          var level = data.Output.table[2].row[i].riskLevel;
          $(element).addClass(level);

          i++;
        });
      });
      //$("#sub_content_row_1 .ui-block-a .ui-bar").click();
      //sessionfun();
    }


    if (data.Output.table != undefined) {
  debugger

      if ((data.Output.table[0] != undefined) && (data.Output.table[0].name != undefined) &&
        (data.Output.table[0].name == "General")) {
		
        if (data.Output.table[0].row.length > 0) {
          GeneralDetails = data.Output.table[0].row[0];
          $("#header_1 h1").append("<br><span>SOID# "+GeneralDetails.nihse_soc_id+"</span>")         
		


          if (GeneralDetails.Type.toUpperCase() == "SAFE") {
            //hide required sections
            //Sources
            $("#listview_21").hide();
            //Severity
            $("#listview_22").hide();
            //Body PArts
            $("#listview_23").hide();
            //Resolution
            $("#listview_24").hide();
            //Observation
            $("#listview_20").hide();


          }
		  //alert(JSON.stringify(GeneralDetails));
          //Primary observer
          $("#text_107").text(GeneralDetails.PrimaryObserver);
          //Observation Date
          var m = moment.utc("" + GeneralDetails.ObservationDate);
          var dt = "Now";
          if (m.isValid())
            dt = m.format("DD-MMM-YYYY");

          $("#text_109").text(dt);
          //what did you see
          $("#text_110").text(GeneralDetails.WhatDid);
          //WorkSite
          $("#text_116").text(GeneralDetails.WorkSite);
          //Specific location
          $("#lblSpecific").text(GeneralDetails.SpecificLocation);
          //Type
          $("#text_117").text(GeneralDetails.Type);
          //Designation
          $("#text_112").text(GeneralDetails.Designation);
          //TAsk observed				
          $("#lbltaskObsVal").text(GeneralDetails.TaskObserved);
        }
      }


      if ((data.Output.table[6] != undefined) && (data.Output.table[6].name != undefined) &&
        (data.Output.table[6].name == "docTable")) {
        if (data.Output.table[6].row.length > 0) {
          var Images = data.Output.table[6].row;
          $("#listview_images").removeClass("hidden");

          if (isLite) {
            $("#grid_photos").remove();
          }
          for (var i = 0; i < Images.length; i++) {
            if (isLite) {

              var c = $(".lite_view").clone();
              c.removeClass("lite_view");
              c.removeClass("hidden");
              c.addClass("lite_view_added");
              var crDt = Images[i].created_date;
              var momentDt = moment.utc(crDt, "YYYY-MM-DD HH:mm:ss.0");
              var dtx = '';
              if (momentDt.isValid()) {
                dtx = "Uploaded On: " + momentDt.local().format("DD-MMM-YYYY hh:mm A");
              }
              c.find("#text_lite_filename").html("<span class='docDesc'> Image# " + (i + 1) +
                "</span><br/><span class='docName'>" + dtx + "</span>");


              c.find("#text_lite_filename").attr("data-id", Images[i].nihse_document_id);
              c.find("#button_lite_view").attr("data-id", Images[i].nihse_document_id);
              c.find("#button_lite_view").attr("data-url", Images[i].doc_path);
              c.find("#button_lite_view").click(function (e) {
                debugger;
                openAtt($(e.target).attr("data-url"));

              });
              if (isMobileView) {
                c.find("#button_lite_view").remove();
              }
              $("#listview_images .ui-last-child").append(c);
            }
            else {
              var url = Images[i].doc_path;
              var upURL = baseURL + url;
              if (isMobileView) {
                upURL = "./attachments" + url;
              }
              var img = $("<img style='width:100%; height: auto; max-height: 300px' src='" +
                upURL + "' data-url='" +
                url + "' onerror='javascript:window.onImgError(this);return false;'/>")

              var imgId = i;
              if (!isMobileView) {
                img.click(function (e) {
                  debugger;
                  openAtt($(e.target).attr("data-url"));

                });
              }
              var lbl = $("#text_lite_filename", $(".lite_view")).clone();
              var crDt = Images[i].created_date;
              var momentDt = moment.utc(crDt, "YYYY-MM-DD HH:mm:ss.0");
              var dtx = '';
              if (momentDt.isValid()) {
                dtx = "Uploaded On: " + momentDt.local().format("DD-MMM-YYYY hh:mm A");
              }
              var xId = imgId;
              lbl.html("<span class='docDesc'> Image# " + (imgId + 1) +
                "</span><br/><span class='docName'>" + dtx + "</span>");
              $($("#grid_photos_row_1").find(".ui-bar-tr")[xId]).append(lbl);
              $($("#grid_photos_row_1").find(".ui-bar-tr")[xId]).append(img);

            }
          }

        }
      }
      if ((data.Output.table[2] != undefined) && (data.Output.table[2].name != undefined) &&
        (data.Output.table[2].name == "Sources")) {
        if (data.Output.table[2].row.length > 0) {
          debugger
          var map = new Map();
          Sources = data.Output.table[2].row;
          var SourcesList = [];

          for (var item of data.Output.table[2].row) {
            debugger
            if (!map.has(item.rsk_type_code)) {
              map.set(item.rsk_type_code, true);
              var t = [];
              t = Sources.filter(function (r) { return r.rsk_type_code == item.rsk_type_code });

              var result = t.map(function (e) { return e.description; }).join(', ');

              SourcesList.push({
                rsk_type_code: item.rsk_type_code,
                description: result
              });
            }
          }
          var htmlstart = '<ul style="word-break: break-word;">'
          var li = '';
          for (var item of SourcesList) {
            li = li + '<li><p style="color:#2f3e46; font-size:16px; font-family:Arial;font-weight:bold;" class="MainHeaderLabel">' + item.rsk_type_code + '(' + item.description + ')' + '</p></li>';
          }

          var end = '</ul>';

          var finalhtml = htmlstart + li + end;
          $('#grid_sources_row_1 .ui-block-a >div').html(finalhtml);
          //$('#listview_21').html();

        }
      }

      if ((data.Output.table[1] != undefined) && (data.Output.table[1].name != undefined) &&
        (data.Output.table[1].name == "ObservationHazard")) {

        if (data.Output.table[1].row.length > 0) {

          ObservationHazard = data.Output.table[1].row;
          var map = new Map();


          var SourcesList = [];

          for (var item of data.Output.table[1].row) {
            debugger
            if (!map.has(item.rsk_type_code)) {
              map.set(item.rsk_type_code, true);
              var t = [];
              t = ObservationHazard.filter(function (r) { return r.rsk_type_code == item.rsk_type_code });

              var result = t.map(function (e) { return e.description; }).join(', ');

              SourcesList.push({
                rsk_type_code: item.rsk_type_code,
                description: result
              });
            }
          }
          var htmlstart = '<ul style="word-break: break-word;">'
          var li = '';
          for (var item of SourcesList) {
            li = li + '<li><p style="color:#2f3e46; font-size:16px; font-family:Arial;font-weight:bold;" class="MainHeaderLabel">' + item.rsk_type_code + '(' + item.description + ')' + '</p></li>';
          }

          var end = '</ul>';

          var finalhtml = htmlstart + li + end;
          $('#grid_obs_row_1 .ui-block-a >div').html(finalhtml);



        }
      }






      debugger
      if ((data.Output.table[4] != undefined) && (data.Output.table[4].name != undefined) &&
        (data.Output.table[4].name == "BodyParts")) {

        debugger
        if (data.Output.table[4].row.length > 0) {
          var htmlstart = '<ul style="word-break: break-word;">'
          var li = '';
          for (var item of data.Output.table[4].row) {
            li = li + '<li><p style="color:#2f3e46; font-size:16px; font-family:Arial;font-weight:bold;" class="MainHeaderLabel">' + item.description + '</p></li>';
          }
          var end = '</ul>';
          var finalhtml = htmlstart + li + end;
          $('#lblbodypart').after(finalhtml);

        }


      }

      if ((data.Output.table[3] != undefined) && (data.Output.table[3].name != undefined) &&
        (data.Output.table[3].name == "Severity")) {

        if (data.Output.table[3].row.length > 0) {

          debugger

          var datad = data.Output.table[3].row[0].nihse_risk_matrix_lkup_id;

          $('label[class*=" score-id"]:contains(' + datad + ')').after($('#tick_symbol'));

          var minotext = data.Output.table[3].row[0].score + '' + data.Output.table[3].row[0].consequences + '' + data.Output.table[3].row[0].likelihood;
          //Bind remaining properties here
          $('#minor_head').text(minotext);

          //Binding minor text
          var minorpara = data.Output.table[3].row[0].occurence;
          $('#minor_para').text(minorpara);
          $('#property').text(data.Output.table[3].row[0].fatality);
          $('#fatality_data').text(data.Output.table[3].row[0].people);
          $('#paragraph_id').text(data.Output.table[3].row[0].environment);

        }
      }


      if ((data.Output.table[5] != undefined) && (data.Output.table[5].name != undefined) &&
        (data.Output.table[5].name == "Resolution")) {

        if (data.Output.table[5].row.length > 0) {

          Resolution = data.Output.table[5].row[0];
          $("#text_109").text(dt);
          //stop work authority
          $("#stopwaval").text(Resolution.Stopwork);
          //feedback
          $("#txtfeedback").text(Resolution.feedback);
          //is Risk
          $("#lblfeedbackreceivedval").text(Resolution.riskControl);
          //CanRig
          $("#lblCanRIGPVALUE").text(Resolution.involvesCanrig);
          //focus
          let Pitem;
          if(Resolution.priorityitem=='N' || Resolution.priorityitem=='null' || Resolution.priorityitem=='' ){
            Pitem='No';
          }
          else{
            Pitem='Yes';
          }
          $("#lblCanRIGPVALUE").after('<br><label id="lblpriorityitem" data-ln="7826451-title" data-cid="26396" data-aftype="21" class="afcontrol  jqm-label-text" data-sessionstorage="" style="color:#2f3e46; font-size:16px; font-family:Arial;font-weight:bold;" data-afrole="html" data-id="7826451">Operator Focus or Operator Rules to Live By: </label>')
          $("#lblpriorityitem").after('<label id="lblpriorityitemval" data-ln="7826455-title" data-cid="26402" data-aftype="21" class="afcontrol MainHeaderLabel jqm-label-text" data-sessionstorage="" style="color:#2f3e46; font-size:16px; font-family:Arial;font-weight:bold;" data-afrole="html" data-id="7826455">'+Pitem+'</label>')
        }
      }






    }

    stopCustomSpinner();
    $('#dim-bg').removeClass('dim');



  }

  function printPDF() {
    debugger
    pdf.capturePageAsPDF();
    return;
    try {
      var element = $(".ui-content")[0];
      var opt = {
        margin: 0.5,
        pagebreak: { mode: ['avoid-all'] },
        filename: 'Inspection Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 5 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      // New Promise-based usage:
      html2pdf().set(opt).from(element).save();
    } catch (e) {
      alert("Error in Printing: " + e);
    }
  }

  function updateInspectorDetails() {
    debugger;
    var i = 0;
    var total = $("#listview_2 .ui-li-has-count").length;
    $("#listview_2 .ui-first-child").not(".ui-bar-c").append($("<div>" + $("#msgInspectionTasks").text() + "</div>"));

    $("#listview_2 .ui-li-has-count").each(function (index, element) {

      debugger;
      var grp = $(element).text();
      var cl = $(".inspector-panel").clone();
      cl.removeClass("inspector-panel");
      cl.addClass("insp-panel");


      var insp = inspectorDetails.filter(function (e) { return e.tmpl_hdr_add_description === grp; });
      if (insp.length > 0) {
        insp = insp[0];
        var iemp = inspectorEmpDetails.filter(function (e) { return e.EMPLOYEE_NUMBER === insp.inspector_id; });
        if (iemp.length > 0) {
          insp.COMPLETE_NAME = iemp[0].COMPLETE_NAME;
          insp.EMPLOYEE_NUMBER = iemp[0].EMPLOYEE_NUMBER;

        }
        updateSignPanel(cl.find("#text_26"), "<span class='fontblueColor'>" + $("#msgInspector").text() + ": </span>" + insp.COMPLETE_NAME + " (" + insp.EMPLOYEE_NUMBER + ")",
          '<span class=fontblueColor>' + $("#msgInspectorDate").text() + ': </span>',
          cl.find("#text_25"), insp.signature_date,
          cl.find("#signature_2")[0], insp.signature);
      } else {
        cl.empty();
        cl.append($("<label><span class='fontblueColor'> Inspection Details: </span>Not yet inspected</label>"));
      }

      if (i == total - 1) { cl.appendTo($(this).parent()); } else {
        var j = 0;
        $("#listview_2 .ui-li-has-count").each(function (indexX, elementX) {

          if (i + 1 == j) {
            cl.insertBefore($(elementX));
          }

          j++;
        });
      }
      i++;
    });
    $("#listview_2 .header-list-button").each(function (index, element) {

      debugger;
      var item = $(this).attr("data-totransfer");

      if (typeof item !== 'undefined') {
        item = JSON.parse(item);

        debugger;

        var itemId = item.itemId;

        var adminDocs = attachments.filter(function (e) { return e.ni_insp_schd_item_id == itemId && e.doc_type === "ADMINDOC" });
        if (adminDocs.length == 0)
          $(this).find("#listview_documents").remove();
        else {
          // Yo
          $(this).find("#listview_documents").find(".ui-last-child").remove();
          var hasImages = false;
          var imgCnt = 0;

          for (var i = 0; i < adminDocs.length; i++) {
            var url = adminDocs[i].doc_path;
            var extension = url.substr((url.lastIndexOf('.') + 1)).toLowerCase().trim();

            var isDoc = true;
            if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
              isDoc = false;
              hasImages = true;
              imgCnt++;
            }
            if (isLite || isDoc) {
              var c = $(".lite_view").clone();
              c.removeClass("lite_view");
              c.addClass("lite_view_added");
              c.find("#text_lite_filename").html("<span class='docDesc'>" + adminDocs[i].doc_description +
                "</span><br/><span class='docName'>" + adminDocs[i].doc_name + "</span>");
              c.find("#text_lite_filename").attr("data-id", adminDocs[i].document_id);
              c.find("#button_lite_view").attr("data-id", adminDocs[i].document_id);
              c.find("#button_lite_view").attr("data-url", adminDocs[i].doc_path);
              c.find("#button_lite_view").click(function (e) {
                debugger;
                openAtt($(e.target).attr("data-url"));

              });
              if (isMobileView) {
                c.find("#button_lite_view").remove();
              }
              $(this).find("#listview_documents").append(c);
            }
          }

          if (!isLite && hasImages) {
            var c = $(".full_view").clone();
            c.removeClass("full_view");
            c.addClass("full_view_added");
            if (imgCnt < 4) {
              //only 1 row
              c.find("#grid_full_view_row_2").remove();
            }
            var imgId = 0;
            for (var i = 0; i < adminDocs.length; i++) {
              var url = adminDocs[i].doc_path;
              var extension = url.substr((url.lastIndexOf('.') + 1)).toLowerCase().trim();

              if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {


                // alert(baseURL + url);
                var img = $("<img style='width:100%; height: auto; max-height: 300px' src='" + baseURL + url + "' data-url='" +
                  url + "' onerror='javascript:window.onImgError(this);return false;'/>")
                var row = 0;
                if (imgId > 2)
                  row = 1;
                var xId = imgId - (row * 3);
                img.click(function (e) {
                  openAtt($(e.target).attr("data-url"));

                });
                var lbl = $("#text_lite_filename", $("#listview_lite_vew")).clone();

                lbl.html("<span class='docDesc'>" + adminDocs[i].doc_description +
                  "</span><br/><span class='docName'>" + adminDocs[i].doc_name + "</span>");
                $(c.find("#grid_full_view_row_" + (row + 1)).find(".ui-bar-tr")[xId]).append(lbl);
                $(c.find("#grid_full_view_row_" + (row + 1)).find(".ui-bar-tr")[xId]).append(img);

                imgId++;

              }
            }

            $(this).find("#listview_documents").append(c);
          }
        }

        var userDocs = attachments.filter(function (e) { return e.ni_insp_schd_item_id == itemId && e.doc_type === "USER IMAGE" });
        if (userDocs.length == 0)
          $(this).find("#listview_attachments").remove();
        else {
          // Yo
          $(this).find("#listview_attachments").find(".ui-last-child").remove();
          var hasImages = false;
          var imgCnt = 0;

          for (var i = 0; i < userDocs.length; i++) {
            var url = userDocs[i].doc_path;
            var extension = url.substr((url.lastIndexOf('.') + 1)).toLowerCase().trim();

            var isDoc = true;
            if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
              isDoc = false;
              hasImages = true;
              imgCnt++;
            }
            if (isLite || isDoc) {
              var c = $(".lite_view").clone();
              c.removeClass("lite_view");
              c.addClass("lite_view_added");

              var crDt = userDocs[i].createdOn;
              var momentDt = moment.utc(crDt, "YYYY-MM-DD HH:mm:ss.0");
              var dtx = '';
              if (momentDt.isValid()) {
                dtx = "Uploaded On: " + momentDt.local().format("DD-MMM-YYYY hh:mm A");
              }
              c.find("#text_lite_filename").html("<span class='docDesc'> Image# " + (i + 1) +
                "</span><br/><span class='docName'>" + dtx + "</span>");
              //c.find("#text_lite_filename").text(userDocs[i].docName + " - " + userDocs[i].doc_description);
              c.find("#text_lite_filename").attr("data-id", userDocs[i].document_id);
              c.find("#button_lite_view").attr("data-id", userDocs[i].document_id);
              c.find("#button_lite_view").attr("data-url", userDocs[i].doc_path);
              c.find("#button_lite_view").click(function (e) {
                debugger;
                openAtt($(e.target).attr("data-url"));

              });
              if (isMobileView) {
                c.find("#button_lite_view").remove();
              }
              $(this).find("#listview_attachments").append(c);
            }
          }


          if (!isLite && hasImages) {
            var c = $(".full_view").clone();
            c.removeClass("full_view");
            c.addClass("full_view_added");
            if (imgCnt < 4) {
              //only 1 row
              c.find("#grid_full_view_row_2").remove();
            }

            var imgId = 0;
            for (var i = 0; i < userDocs.length; i++) {
              var url = userDocs[i].doc_path;
              var extension = url.substr((url.lastIndexOf('.') + 1)).toLowerCase().trim();

              if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {



                var img = $("<img style='width:100%; height: auto; max-height: 300px' src='" + baseURL + url + "' data-url='" +
                  url + "' onerror='javascript:window.onImgError(this);return false;'/>")
                var row = 0;
                if (imgId > 2)
                  row = 1;
                var xId = imgId - (row * 3);
                img.click(function (e) {
                  debugger;
                  openAtt($(e.target).attr("data-url"));

                });
                var lbl = $("#text_lite_filename", $("#listview_lite_vew")).clone();
                var crDt = userDocs[i].createdOn;
                var momentDt = moment.utc(crDt, "YYYY-MM-DD HH:mm:ss.0");
                var dtx = '';
                if (momentDt.isValid()) {
                  dtx = "Uploaded On: " + momentDt.local().format("DD-MMM-YYYY hh:mm A");
                }
                lbl.html("<span class='docDesc'> Image# " + (imgId + 1) +
                  "</span><br/><span class='docName'>" + dtx + "</span>");
                $(c.find("#grid_full_view_row_" + (row + 1)).find(".ui-bar-tr")[xId]).append(lbl);
                $(c.find("#grid_full_view_row_" + (row + 1)).find(".ui-bar-tr")[xId]).append(img);

                imgId++;
              }
            }

            $(this).find("#listview_attachments").append(c);
          }

        }
      }
    });

    /*
    $("#listview_2 .header-list-button").each(function(index, element) {
 
        debugger;
        var item = $(this).attr("data-totransfer");
 
        if (typeof item !== 'undefined') {
            item = JSON.parse(item);
 
            var cl = $(".inspector-panel").clone();
            cl.removeClass("inspector-panel");
            cl.addClass("insp-panel");
 
 
            var insp = inspectorDetails.filter(function(e) { return e.tmpl_hdr_add_description === item.group_name; });
            if (insp.length > 0) {
                insp = insp[0];
                var iemp = inspectorEmpDetails.filter(function(e) { return e.EMPLOYEE_NUMBER === insp.inspector_id; });
                if (iemp.length > 0) {
                    insp.COMPLETE_NAME = iemp[0].COMPLETE_NAME;
                    insp.EMPLOYEE_NUMBER = iemp[0].EMPLOYEE_NUMBER;
 
                }
                updateSignPanel(cl.find("#text_26"), "<span class='fontblueColor'> Inspector: </span>" + insp.COMPLETE_NAME + " (" + insp.EMPLOYEE_NUMBER + ")",
                    '<span class=fontblueColor>Inspection Date: </span>',
                    cl.find("#text_25"), insp.signature_date,
                    cl.find("#signature_2")[0], insp.signature);
            } else {
                cl.empty();
                cl.append($("<div>Not yet inspected</div>"));
            }
 
            cl.insertAfter($(this));
 
        }
 
 
 
    });
    */
    $(".inspector-panel").remove();

  }

  window.onImgError = function (e) {
    debugger;
    //    alert("Error loading Image");
    $(e).parent().append($("<br/><label>Unable to Load Image.</label>"));
    $(e).addClass("hidden");
  }

  function openAtt(url) {
    //  alert(url);
    if ((AFUtil.isOfflineAppClicked()) || isMobile.any()) {
      if (isMobile.Android()) {
        FileOpener.openFile(url, function () { }, function () { });
      } else {
        var extension = url.substr((url.lastIndexOf('.') + 1)).toLowerCase().trim();
        var fileName = "";
        try {
          fileName = url.split("/")[url.split("/").length - 1];
        } catch (e) { }

        // alert(url);
        // alert(fileName);
        // window.open(url, )
        openInAppBrowser(baseURL + url + '&sessionId=' + AFUtil.getCookie('sessionId'), extension, fileName);
      }
    } else {
      window.open(baseURL + url);
    }
    return false;
  }

  function updateApprovalDetails() {
    if (approverDetails.length != 1) {
      $("#listview_3 .ui-li-static").empty();
      $("#listview_3 .ui-li-static").append($("<label>Not yet approved</label>"));
    } else {

      updateSignPanel($("#text_23"), "<span class='fontblueColor'>" + $("#msgApprover").text() + ": </span>" + approverDetails[0].COMPLETE_NAME + " (" + approverDetails[0].EMPLOYEE_NUMBER + ")",
        '<span class=fontblueColor>' + $("#msgApprovalDate").text() + ': </span>',
        $("#text_24"), approverDetails[0].signature_date,
        $("#signature_1")[0], approverDetails[0].signature);
    }
  }



  function decodeNaborsURIComponent(s) {
    var x = s;
    try {

      x = decodeURIComponent(s.replace(/\+/g, ' '));
    } catch (e) {
      x = s;
    }
    return x;
  }




  $(document).ready(function () {



    debugger
    var riskid = $("#txtRISK").text();
    $('label[class*=" score-id"]:contains(riskid)').after($('#tick_symbol'));



    //window.print();   


  });

  function startCustomSpinner() {
    $("html").addClass("ui-panel-loading");
  }
  function stopCustomSpinner() {
    $("html").removeClass("ui-panel-loading");
  }

}
catch (err) {

  alert('error' + err.message);

}
