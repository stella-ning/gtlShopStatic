
$(function () {

    // 表单验证
    $('.form-horizontal').validate({
        onFocus: function() {
            //$(this).addClass('active');
        return false;
        },
        onBlur: function() {
            var $parent = this.parents('.form-group');
            var _status = parseInt(this.attr('data-status'));
           // $parent.removeClass('active');
            if (!_status) {
                $parent.addClass('has-error');
            }else{
                $parent.removeClass('has-error');
            }
            return false;
        }
    });
    $('.form-horizontal').on('submit', function(event) {
         if(!$(this).validate('submitValidate')){
            var $formGroup = $('.error .required').parents('.form-group');
            $formGroup.addClass('has-error');
            return false;
        }
    });



});
