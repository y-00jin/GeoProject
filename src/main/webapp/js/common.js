function validation(fields) {

    if(fields == null){
        return false;
    } else{

        for(const field of fields){
            const {id, name, pattern, message} = field;
            const value = $('#'+id).val();

            if(!value){
                alert(name + '은(는) 필수 입력 항목입니다.');
                $('#'+id).focus();
                return false;
            }

            if(pattern != null && !pattern.test(value)){
                alert(message);
                $('#'+id).focus();
                return false;
            }
        }

        return true;
    }

}


// Toast 메시지
function showToast(icon, message, position = 'top-end', timer = 2000) {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);

            toast.style.fontSize = '12px';
        }
    });

    Toast.fire({
        icon: icon,  // success | error | warning | info | question
        title: message
    });
}