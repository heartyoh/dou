# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
    './compose'
    './property'
], (compose, withProperty) ->
    
    "use strict"

    serialize = ->
        [
            "type: #{this.name}"
            "id: #{this.id}"
            "props: #{JSON.stringify(this.attrs)}"   
        ].join(',')

    deserialize = ->

    # serialize 되는 객체는
    # 타입과 id를 가지면 좋겠다.
    # 타입 정보는 .. 
    # 클래스이름과 구현이 있는 로케이션 정보 등이 좋겠다.
    # 플러그인 정보는 필요없나 ? 나중에 고민 합시다..
    ->
        compose.mixin this, withProperty
        
        this.serialize = serialize if !this.serialize
        this.deserialize = deserialize if !this.deserialize
