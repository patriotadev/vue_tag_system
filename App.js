let vm = new Vue({
    el : '#app',
    data : {
        tags : ['html','php','css','swift','database','js','c','c++ '],
        isHidden : true,
        arrowPos : 0,
        keyword : '',
        tags_temp : [],
        isEmpty : ''
    },
    computed : {
        filterTags() {
            _self = this
            return this.tags.filter(function(tag) {
                _used = _self.tags_temp.indexOf('' + tag + '') < 0;
                return tag.indexOf(_self.keyword) >= 0 && _used;
            });
        }
    },
    methods: {
        showList : function() {
            this.isHidden = false;
        },
        filterDown : function() {
            this.setHighlight(1);
        },
        filterUp : function() {
            this.setHighlight(-1);
        },
        setHighlight : function(val) {
            _isFirst = true;
            _tags = document.getElementsByClassName('tags');

            for(let i= 0; i < _tags.length; i++)
            {
                if(_tags[i].classList.contains('active'))
                {
                    _tags[i].classList.remove('active');
                    _isFirst = false;
                }
            }

            this.arrowPos += val;

            //LIMIT

            if(this.arrowPos < 0) this.arrowPos = 0;
            if(this.arrowPos >= _tags.length) this.arrowPos = _tags.length - 1;

            if(_isFirst)
            {
                _tags[0].classList.add('active');
                this.arrowPos = 0;
            }
            else
            {
                _tags[this.arrowPos].classList.add('active');
            }    
        },
        addTag : function() {
         
                tag = document.getElementsByClassName('tags')[this.arrowPos].textContent;
               // console.log(tag);
                this.tags_temp.push(tag);
                this.keyword = '';
                this.isHidden = true;
        },
        removeTag : function(el) {

            if(typeof(el) == 'string') {
                let index = this.tags_temp.indexOf(el);
                this.tags_temp.splice(index, 1);
            }
            else {

                if(this.keyword !== '') {
                    this.isEmpty = false;
                }

                if(this.isEmpty) {
                    this.tags_temp.splice(-1, 1);
                }


                if(this.keyword == '') {
                    this.isEmpty = true;
                }
            }
        },
    },
});