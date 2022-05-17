$(function() {
    $('.js_datepicker').datepicker({dateFormat: 'yy-mm-dd'});
})

dateFormatter = function(newDay, today) {
    var today = new Date('2020-05-16')	
    var newDay = new Date(today)
    var year = newDay.getFullYear()
    var month = newDay.getMonth()+1
    var date = newDay.getDate()
    
    if(today) {
        var todayDate = today.getDate()

        if(date != todayDate) {
            if (month == 0) year-=1
            month = (month + 11) % 12
            date = new Date(year, month, 0).getDate()
        }
    }

    month = ("0"+month).slice(-2)
    date = ("0"+date).slice(-2)

    return year+"-"+month+"-"+date
}

document.getElementsByName("filterDate").forEach(e=> {
    e.addEventListener('click', function() {
        
        let endDate = new Date($("#endDate").val())
        let newDate = new Date($("#endDate").val())

        switch(this.value) {
            case '1':
                newDate.setDate(newDate.getDate() - 7)
                newDate = dateFormatter(newDate)
                console.log("일주일")
                break;
            case '2':
                newDate.setMonth(newDate.getMonth() - 3)
                newDate = dateFormatter(newDate, endDate)
                console.log("3개월")
                break;
            case '3':
                newDate.setMonth(newDate.getMonth() - 6)
                newDate = dateFormatter(newDate, endDate)
                console.log("6개월")
                break;
            case '4':
                newDate.setFullYear(newDate.getFullYear() - 1)
                newDate = dateFormatter(newDate, endDate)
                console.log("1년")
                break;
        }
        $("#startDate").val(newDate)
    })
})