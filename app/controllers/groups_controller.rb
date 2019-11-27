class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end  

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end 
  end

  def edit
  end 

  def update #set_groupによって@groupにはグループの全部の情報が入る（編集前の情報）
    if @group.update(group_params)  #group_paramsにはform_forで編集された情報が入る。
      redirect_to group_messages_path(@group), notice: 'グループを更新しました'#上の文は@groupの情報をgroup_paramsに書き換えることを記してる
    else #group_message_pathというメソッドを使うことで、書き換えられた新しい@groupを引数として渡すことで、rails側でidだけを取り出し処理してくれる
      render :edit  #グループの情報全てを渡さないと処理できないためidだけだとエラーがおきる。
    end  
  end
  private
  def group_params                                #[]にはグループに入っているユーザーが配列として入れられている
    params.require(:group).permit(:name,user_ids: [] )
  end  #group_paramsにはform_forで編集された情報が入る。

  def set_group
    @group = Group.find(params[:id])
  end        #＠groupにはグループ全ての情報が代入される
end  