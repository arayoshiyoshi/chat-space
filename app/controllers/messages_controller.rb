# postsclass MessagesController < ApplicationController
class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Post.new
    @messages = @group.posts.includes(:user)
  end

  def create
    @message = @group.posts.new(post_params)
    if @message.save
      respond_to do |format|
        format.json
      end
    else
      @messages = @group.posts.includes(:user)
      flash.now[:alert] = "メッセージを入力してください"
      render :index
    end
  end

  private
  def post_params
    params.require(:post).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
